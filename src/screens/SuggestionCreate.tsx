import React from "react";
import { ScrollView } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { Button } from "../components/Button";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { insertSuggestion } from "../graphql/mutation";
export default (props: NavigationStackScreenProps) => {
  const [insert] = useMutation(insertSuggestion);
  const [{ board_id, created_by, updated_by }] = useStore();
  const [body, setBody] = React.useState("제안을 하십시오.");
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={e => props.navigation.goBack()}
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 3, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "black", fontSize: 28 }}>제안하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={e =>
            insert({
              variables: {
                body,
                board_id,
                created_by,
                updated_by
              }
            })
              .then(res => alert(JSON.stringify(res.data)))
              .then(e => props.navigation.goBack())
          }
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>등록</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <TextInput
          value={body}
          autoFocus
          multiline
          textAlignVertical="top"
          onChange={e => setBody(e.nativeEvent.text)}
          style={{ backgroundColor: "lightyellow", flex: 1, padding: 20 }}
        />
      </View>
    </>
  );
};
