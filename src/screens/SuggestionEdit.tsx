import React from "react";
import { ScrollView } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { Text } from "../components/Text";
import { TextInput } from "../components/TextInput";
import { View, ViewRow } from "../components/View";
import LoadingIndicator from "../components/LoadingIndicator";
import { Button } from "../components/Button";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useStore } from "../Store";
import { updateSuggestion } from "../graphql/mutation";
export default (props: NavigationStackScreenProps<{ suggestion: any }>) => {
  const suggestion = props.navigation.getParam("suggestion");
  const { id } = suggestion;
  const [update] = useMutation(updateSuggestion);
  const [body, setBody] = React.useState(suggestion.body);
  return (
    <>
      <ViewRow>
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
            update({
              variables: {
                body,
                id
              }
            })
              .then(res => alert(JSON.stringify(res.data)))
              .then(e => props.navigation.goBack())
          }
          style={{ flex: 1, alignItems: "center", padding: 20 }}
        >
          <Text style={{ color: "blue", fontSize: 20 }}>등록</Text>
        </TouchableOpacity>
      </ViewRow>
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
