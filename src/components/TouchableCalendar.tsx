import React from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { format } from "date-fns";

import { Body16 } from "./Text";
import { V0 } from "./View";
import { TORow } from "./TouchableOpacity";
import { whiteRoundBg } from "./Styles";
type IOSMode = "date" | "time" | "datetime" | "countdown";
export default function TouchableCalendar(props: {
  useDate: [Date, React.Dispatch<React.SetStateAction<Date>>];
  minimumDate?: Date;
}) {
  const { useDate, minimumDate } = props;
  const [date, setDate] = useDate;
  const [isVisible, setVisible] = React.useState(false);
  const [mode, setMode] = React.useState<IOSMode>(
    Platform.select({ ios: "datetime", android: "date" })
  );
  function onChange(event: any, selectedDate: Date) {
    if (Platform.OS === "android") {
      switch (event.type) {
        case "dismissed": {
          return setVisible(false);
        }
        case "set": {
          setVisible(false);
          const currentDate = selectedDate || date;
          setDate(currentDate);
          if (mode === "date") {
            setMode("time");
            setVisible(true);
          }
        }
      }
    } else if (Platform.OS === "ios") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
  }
  function showCalendarHandler() {
    if (Platform.OS === "android") {
      setMode("date");
    }
    setVisible(true);
  }

  const Picker = (
    <DateTimePicker
      style={{ width: "100%" }}
      mode={mode}
      value={date}
      onChange={onChange}
      minimumDate={minimumDate}
    />
  );
  return (
    <>
      <TORow onPress={showCalendarHandler}>
        <Body16>{format(date, "yyyy/MM/dd HH:mm")}</Body16>
      </TORow>
      {Platform.select({
        ios: (
          <Modal
            isVisible={isVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => setVisible(false)}
          >
            <V0 style={whiteRoundBg}>{Picker}</V0>
          </Modal>
        ),
        android: isVisible && Picker,
      })}
    </>
  );
}
