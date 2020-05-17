import React from "react";
import { ViewProps } from "react-native";
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";
import { Candidate } from "../types";

import { Image } from "./Image";
import { TO0, TORowCenter } from "./TouchableOpacity";
import { ViewRow, V0 } from "./View";
import { Mint16, Body16 } from "./Text";
import { TextInput } from "./TextInput";
import { whiteRoundBg, textStyle } from "./Styles";
import { LineSeperatorFull } from "./LineDivider";

import iconClosed from "../../assets/iconClosed.png";
import iconAddForm from "../../assets/iconAddForm.png";
export const removingIds = [];
export const addingCandidates = {};
export default function CandidateEdit(props: {
  style?: ViewProps;
  values: Partial<Candidate>[];
  setValues: any;
}) {
  const { values, setValues } = props;
  const [isVisible, setVisible] = React.useState(false);
  const [newCandidate, setNewCandidate] = React.useState("");
  function addHandler() {
    if (!newCandidate) {
      return;
    }
    if (values.find((c) => c.body === newCandidate)) {
      return showMessage({ type: "warning", message: "중복될 수 없습니다." });
    }
    const candidate = { body: newCandidate };
    addingCandidates[newCandidate] = values.length + 1;
    values.push(candidate);
    setNewCandidate("");
    setValues([...values]);
    setVisible(false);
  }
  function showAddModal() {
    setVisible(true);
  }
  return (
    <>
      {values.map((c, i: number) => {
        const count = c?.votes_aggregate?.aggregate?.sum?.count || 0;
        function removeHandler() {
          if (c.id) {
            removingIds.push(c.id);
          } else {
            delete addingCandidates[c.body];
          }
          if (values.length > 2) {
            values.splice(i, 1);
            setValues([...values]);
          }
        }
        return (
          <ViewRow
            key={i}
            style={{ borderBottomWidth: 1, borderBottomColor: "#e4e4e4" }}
          >
            <Body16 style={{ flex: 1 }}>{c.body}</Body16>
            {count === 0 ? (
              <TO0
                style={{ padding: 15, paddingRight: 0 }}
                onPress={removeHandler}
              >
                <Image source={iconClosed} />
              </TO0>
            ) : (
              <Body16 style={{ padding: 10, paddingRight: 0 }}>{count}</Body16>
            )}
          </ViewRow>
        );
      })}
      <TORowCenter style={{ paddingTop: 15 }} onPress={showAddModal}>
        <Image source={iconAddForm} style={{ marginRight: 10 }} />
        <Mint16>항목추가</Mint16>
      </TORowCenter>
      <Modal
        isVisible={isVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setVisible(false)}
      >
        <V0 style={[whiteRoundBg, { alignItems: "stretch", padding: 30 }]}>
          <ViewRow>
            <Mint16>새 항목: </Mint16>
            <TextInput
              value={newCandidate}
              onChangeText={setNewCandidate}
              placeholderTextColor="#999999"
              autoFocus={true}
              style={[textStyle]}
              placeholder="항목 입력"
            />
          </ViewRow>
          <LineSeperatorFull style={{ marginVertical: 15 }} />
          <TO0 onPress={addHandler}>
            <Mint16>확인</Mint16>
          </TO0>
        </V0>
      </Modal>
    </>
  );
}
