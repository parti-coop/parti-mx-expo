import React from "react";
import { ViewStyle } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { insertUserCandidate } from "../graphql/mutation";
import { useStore } from "../Store";
import { Candidate } from "../types";

import { Image } from "./Image";
import { White16, Mint14, Body14, Body16 } from "./Text";
import { ViewRow, View } from "./View";
import iconFormCheckbox from "../../assets/iconFormCheckbox.png";
import { TORow } from "./TouchableOpacity";
import ViewCheckbox from "./ViewCheckbox";

export default function TouchableCheckBar(props: {
  style?: ViewStyle;
  candidate: Candidate;
  total: number;
  voted: boolean;
}) {
  const { style, candidate, total = 0, voted = false } = props;
  const [{ user_id }, dispatch] = useStore();
  const myVote = !!candidate?.votes?.[0]?.count;
  const count = candidate?.votes_aggregate?.aggregate?.sum?.count || 0;
  const percentage = Math.round((count * 100) / total) || 0;

  const [insert, { loading }] = useMutation(insertUserCandidate, {
    variables: {
      candidate_id: candidate.id,
      user_id,
      post_id: candidate.post.id,
    },
  });
  function insertHandler() {
    insert();
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  if (voted) {
    return (
      <ViewRow style={[{}, style]}>
        <View style={{ flex: 1 }}>
          {count === 0 ? (
            <TORow onPress={insertHandler}>
              <ViewCheckbox value={false} style={{ marginRight: 9 }} />
              <Body16>{candidate?.body}</Body16>
            </TORow>
          ) : (
            <TORow
              onPress={insertHandler}
              style={{
                width: percentage + "%",
                height: 27,
                borderRadius: 13.5,
                backgroundColor: "#e9c149",
                paddingHorizontal: 15,
              }}
            >
              {myVote && (
                <Image
                  source={iconFormCheckbox}
                  style={{ tintColor: "white" }}
                />
              )}
              <White16 style={{ position: "absolute", left: 35 }}>
                {candidate?.body}
              </White16>
            </TORow>
          )}
        </View>
        <TORow style={{ width: "25%", justifyContent: "flex-end" }}>
          <Mint14>{count}표</Mint14>
          <Body14>({percentage}%)</Body14>
        </TORow>
      </ViewRow>
    );
  } else {
    return (
      <TORow style={style} onPress={insertHandler}>
        <ViewCheckbox value={false} style={{ marginRight: 9 }} />
        <Body16>{candidate?.body}</Body16>
      </TORow>
    );
  }
}
