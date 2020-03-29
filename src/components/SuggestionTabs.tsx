import React from "react";

import { Text, Black14 } from "./Text";
import { View, ViewRow } from "./View";
import { TouchableOpacity, TO0 } from "./TouchableOpacity";
import SuggestionVoted from "../components/SuggestionVoted";
import Comments from "../components/Comments";

export default (props: { comments: any; voteUsers: any; id: number }) => {
  const { comments, voteUsers, id } = props;

  const [showComments, setShowComments] = React.useState(true);

  return (
    <>
      <ViewRow
        style={{ marginHorizontal: 30, marginTop: 40, marginBottom: 20 }}
      >
        <TO0 onPress={e => setShowComments(true)}>
          <Black14 style={!showComments && { color: "rgba(51, 51, 51, 0.5)" }}>
            댓글 {comments.length}
          </Black14>
        </TO0>
        <View
          style={{
            width: 1,
            height: 12,
            backgroundColor: "#c1c1c1",
            marginHorizontal: 20
          }}
        />
        <TO0 onPress={e => setShowComments(false)}>
          <Black14 style={showComments && { color: "rgba(51, 51, 51, 0.5)" }}>
            제안동의 {voteUsers.length}
          </Black14>
        </TO0>
      </ViewRow>

      {showComments ? (
        <Comments comments={comments} suggestionId={id} />
      ) : (
        <SuggestionVoted voteUsers={voteUsers} />
      )}
    </>
  );
};
