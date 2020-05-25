import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { format } from "date-fns";

import { Body16 } from "./Text";
import { V0 } from "./View";
import { TORow } from "./TouchableOpacity";
import { whiteRoundBg } from "./Styles";

export default function TouchableCalendar(props: {
  useDate: [Date, React.Dispatch<React.SetStateAction<Date>>];
  minimumDate?: Date;
}) {
  const { useDate, minimumDate } = props;
  const [date, setDate] = useDate;
  const [isVisible, setVisible] = React.useState(false);
  function onChange(event: any, selectedDate: Date) {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  }
  function showCalendarHandler() {
    setVisible(true);
  }
  return (
    <>
      <TORow onPress={showCalendarHandler}>
        <Body16>{format(date, "yyyy/MM/dd HH:mm")}</Body16>
      </TORow>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setVisible(false)}
      >
        <V0 style={whiteRoundBg}>
          <DateTimePicker
            style={{ width: "100%" }}
            mode="datetime"
            value={date}
            onChange={onChange}
            minimumDate={minimumDate}
          />
        </V0>
      </Modal>
    </>
  );
}
