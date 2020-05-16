import React from "react";
import { ViewStyle } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import {
  insertUserCandidate,
  removeUserCandidate,
  insertMultipleUserCandidate,
  removeMultipleUserCandidate,
} from "../graphql/mutation";
import { useStore } from "../Store";
import { Candidate } from "../types";

import { Image } from "./Image";
import { White16, Mint14, Body14, Body16 } from "./Text";
import { whiteRoundBg } from "./Styles";
import { KeyboardAwareScrollView } from "./KeyboardAwareScrollView";
import { ViewRow, View } from "./View";
import iconFormCheckbox from "../../assets/iconFormCheckbox.png";
import { TORow } from "./TouchableOpacity";
import ViewCheckbox from "./ViewCheckbox";
import UserProfileNameDate from "./UserProfileNameDate";

export default function TouchableCheckBar(props: {
  style?: ViewStyle;
  candidate: Candidate;
  total: number;
  max: number;
  voted: boolean;
}) {
  const { style, candidate, total = 0, voted = false, max = 1 } = props;
  const [{ user_id }, dispatch] = useStore();
  const myVote = !!candidate?.myVote?.[0]?.count;
  const count = candidate?.votes_aggregate?.aggregate?.sum?.count || 0;
  const percentage = Math.round((count * 100) / total) || 0;
  const width = Math.round((count * 100) / max) || 0;
  const [isVisible, setVisible] = React.useState(false);
  const [insert, { loading }] = useMutation(insertUserCandidate, {
    variables: {
      candidate_id: candidate.id,
      user_id,
      post_id: candidate.post.id,
    },
  });
  const [unvote, {}] = useMutation(removeUserCandidate, {
    variables: {
      candidate_id: candidate.id,
      user_id,
      post_id: candidate.post.id,
    },
  });
  const [multipleInsert, {}] = useMutation(insertMultipleUserCandidate, {
    variables: {
      candidate_id: candidate.id,
      post_id: candidate.post.id,
    },
  });
  const [multipleUnvote, {}] = useMutation(removeMultipleUserCandidate, {
    variables: {
      candidate_id: candidate.id,
      user_id,
    },
  });
  const {
    isMultiple = false,
    isResultHidden = false,
    isAnonymous = false,
  } = candidate?.post?.metadata;
  function insertHandler() {
    if (isMultiple) {
      return multipleInsert();
    }
    insert();
  }
  function deleteHandler() {
    if (isMultiple) {
      return multipleUnvote();
    }
    unvote();
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);

  function viewVotersHandler() {
    if (isAnonymous) {
      return showMessage({ type: "info", message: "익명투표 입니다." });
    }
    if (count > 0) {
      return setVisible(true);
    }
  }

  const OnlyCheckbox = (
    <TORow style={style} onPress={myVote ? deleteHandler : insertHandler}>
      <ViewCheckbox value={myVote} style={{ marginRight: 9 }} />
      <Body16>{candidate?.body}</Body16>
    </TORow>
  );

  if (isResultHidden) {
    return OnlyCheckbox;
  } else if (!voted) {
    return OnlyCheckbox;
  } else {
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
              onPress={myVote ? deleteHandler : insertHandler}
              style={{
                width: width + "%",
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
        <TORow
          style={{ width: "25%", justifyContent: "flex-end" }}
          onPress={viewVotersHandler}
        >
          <Mint14>{count}표</Mint14>
          <Body14>({percentage}%)</Body14>
        </TORow>
        <Modal
          isVisible={isVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setVisible(false)}
        >
          <KeyboardAwareScrollView
            style={[whiteRoundBg, { marginVertical: 100 }]}
            contentContainerStyle={{ flex: 0 }}
          >
            <ViewRow style={{ padding: 30, flex: 0 }}>
              {candidate.votes.map((u, i: number) => (
                <UserProfileNameDate
                  name={u.user.name}
                  key={i}
                  date={u.created_at}
                  photoUrl={u.user.photo_url}
                />
              ))}
            </ViewRow>
          </KeyboardAwareScrollView>
        </Modal>
      </ViewRow>
    );
  }
}
