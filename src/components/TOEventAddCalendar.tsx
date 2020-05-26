import React from "react";
import { Platform, ViewStyle, Linking } from "react-native";
import Modal from "react-native-modal";
import * as Calendar from "expo-calendar";
import { addHours } from "date-fns";

import { Body16, Mint13 } from "./Text";
import { V0 } from "./View";
import { Image } from "./Image";
import { TORow } from "./TouchableOpacity";
import { EventMetadata } from "../types";
import { whiteRoundBg } from "./Styles";

import { getIosDateRef } from "../Utils/CalculateDays";
import iconGoogleCalendar from "../../assets/iconGoogleCalendar.png";
import iconAddForm from "../../assets/iconAddForm.png";

export default function TOEventAddCalendar(props: {
  metadata?: EventMetadata;
  title?: string;
  style?: ViewStyle;
}) {
  const { metadata, style, title } = props;

  const [isVisible, setVisible] = React.useState(false);

  async function createCalendar() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
      // return console.log(calendars);
      const defaultCalendar = calendars.find(
        (each) => each.source.name === "Default"
      );
      if (!defaultCalendar) {
        return false;
      }
      const details = Platform.select({
        ios: {
          url: "https://parti.mx",
        },
        android: {
          timeZone: null,
          endTimeZone: null,
          organizerEmail: null,
          accessLevel: null,
          guestsCanModify: false,
          guestsCanInviteOthers: false,
          guestsCanSeeGuests: false,
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
      const evnetId = await Calendar.createEventAsync(defaultCalendar.id, {
        title,
        startDate,
        endDate,
        location: metadata?.place,
        ...details,
      });

      if (Platform.OS === "ios") {
        Linking.openURL("calshow:" + getIosDateRef(startDate));
      } else if (Platform.OS === "android") {
        Calendar.openEventInCalendar(evnetId);
        // Linking.openURL('content://com.android.calendar/time/');
      }
    } else {
      console.log(status);
    }
  }
  return (
    <>
      <TORow
        style={[{ paddingHorizontal: 30 }, style]}
        onPress={createCalendar}
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
