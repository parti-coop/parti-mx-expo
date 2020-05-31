import React from "react";
import { Platform, ViewStyle, Linking } from "react-native";
import Modal from "react-native-modal";
import * as Calendar from "expo-calendar";
import { addHours } from "date-fns";
import { showMessage } from "react-native-flash-message";

import { Mint13 } from "./Text";
import { V0 } from "./View";
import { Image } from "./Image";
import { TORow } from "./TouchableOpacity";
import { EventMetadata } from "../types";
import { whiteRoundBg } from "./Styles";
import COLORS from "./Colors";

import { getIosDateRef } from "../Utils/CalculateDays";
import iconGoogleCalendar from "../../assets/iconGoogleCalendar.png";
import iconAddForm from "../../assets/iconAddForm.png";
const PARTI_CALENDAR_NAME = "parti.mx";
export default function TOEventAddCalendar(props: {
  metadata?: EventMetadata;
  title?: string;
  style?: ViewStyle;
}) {
  const { metadata, style, title } = props;

  const [isVisible, setVisible] = React.useState(false);
  async function createCalendar() {
    const newCalendarSource = {
      isLocalAccount: true,
      name: PARTI_CALENDAR_NAME,
      type: "com.google",
    };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: "빠띠 믹스",
      color: COLORS.MINT,
      entityType: Calendar.EntityTypes.EVENT,
      source: newCalendarSource,
      name: PARTI_CALENDAR_NAME,
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    return newCalendarID;
  }
  async function createEventHandler() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      return showMessage({ type: "danger", message: status });
    }
    let defaultCalendarId = null;
    if (Platform.OS === "ios") {
      defaultCalendarId = (await Calendar.getDefaultCalendarAsync()).id;
    } else if (Platform.OS === "android") {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendars = calendars.find(
        (each) => each.accessLevel === "owner"
      );

      if (defaultCalendars) {
        defaultCalendarId = defaultCalendars.id;
      } else {
        const partiCalendars = calendars.find(
          (each) => each.source.name === PARTI_CALENDAR_NAME
        );
        if (partiCalendars) {
          defaultCalendarId = partiCalendars.id;
          // return await Calendar.deleteCalendarAsync(defaultCalendarId);
        } else {
          defaultCalendarId = await createCalendar();
        }
      }
    }
    // console.log(defaultCalendarId);
    const details = Platform.select({
      ios: {
        url: "https://parti.mx",
      },
    });
    let startDate = null,
      endDate = null;
    try {
      startDate = new Date(metadata?.eventDate);
      endDate = addHours(new Date(metadata?.eventDate), 1.5);
    } catch (error) {
      startDate = new Date();
      endDate = addHours(new Date(), 1.5);
    }
    const evnetId = await Calendar.createEventAsync(defaultCalendarId, {
      title,
      startDate,
      endDate,
      location: metadata?.place,
      ...details,
    });
    // console.log(evnetId);
    if (Platform.OS === "ios") {
      Linking.openURL("calshow:" + getIosDateRef(startDate));
    } else if (Platform.OS === "android") {
      Calendar.openEventInCalendar(evnetId);
    }
  }
  return (
    <>
      <TORow
        style={[{ paddingHorizontal: 30 }, style]}
        onPress={createEventHandler}
      >
        <Image source={iconGoogleCalendar} />
        <Mint13 style={{ fontFamily: "notosans700", marginHorizontal: 8 }}>
          구글 캘린더에 추가
        </Mint13>
        <Image source={iconAddForm} />
      </TORow>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setVisible(false)}
      >
        <V0 style={whiteRoundBg}></V0>
      </Modal>
    </>
  );
}
