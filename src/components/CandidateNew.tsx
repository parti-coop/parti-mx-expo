import React from "react";
import { ViewProps } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Image } from "./Image";
import { TWF0, TO0, TORowCenter } from "./TouchableOpacity";
import { ViewRow, View } from "./View";
import { Mint16, Body16 } from "./Text";
import { TextInput } from "./TextInput";
import { bgStyle, textStyle } from "./Styles";

import iconClosed from "../../assets/iconClosed.png";
import iconAddForm from "../../assets/iconAddForm.png";

export default function CandidateNew(props: {
  style?: ViewProps;
  values: string[];
  setValues: any;
}) {
  const { values = ["", ""], setValues } = props;
  function addHandler() {
    values.push("");
    setValues([...values]);
  }
  return (
    <>
      {values.map((c: string, i: number) => {
        function textHandler(text: string) {
          values[i] = text;
          setValues([...values]);
        }
        function removeHandler() {
          if (values.length > 2) {
            values.splice(i, 1);
            setValues([...values]);
          } else {
            values[i] = "";
            setValues([...values]);
          }
          //  {
          //   showMessage({
          //     type: "warning",
          //     message: "항목은 적어도 하나는 있어야 합니다.",
          //   });
          // }
        }
        return (
          <ViewRow
            key={i}
            style={{ borderBottomWidth: 1, borderBottomColor: "#e4e4e4" }}
          >
            <TextInput
              value={c}
              onChangeText={textHandler}
              placeholderTextColor="#999999"
              style={[textStyle]}
              placeholder="항목 입력"
            />
            <TO0
              style={{ padding: 15, paddingRight: 0 }}
              onPress={removeHandler}
            >
              <Image source={iconClosed} />
            </TO0>
          </ViewRow>
        );
      })}
      <TORowCenter style={{ paddingTop: 15 }} onPress={addHandler}>
        <Image source={iconAddForm} style={{ marginRight: 10 }} />
        <Mint16>항목추가</Mint16>
      </TORowCenter>
    </>
  );
}
