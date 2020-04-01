import React, { MutableRefObject } from "react";

import { Text, Title14 } from "./Text";
import { View, ViewRow } from "./View";
import { TouchableOpacity, TO0 } from "./TouchableOpacity";
import SuggestionVoted from "../components/SuggestionVoted";
import Comments from "../components/Comments";

export default (props: {
  comments: any;
  voteUsers: Array<{ name: string; created_at: string; photo_url: string }>;
  id: number;
  scrollRef: MutableRefObject<any>;
}) => {
  const { comments, voteUsers, id, scrollRef } = props;
  const [showComments, setShowComments] = React.useState(true);

  function showCommentHandler() {
    setShowComments(true);
    scrollRef.current.scrollToEnd();
  }
  function showVoterHandler() {
    setShowComments(false);
    scrollRef.current.scrollToEnd();
  }
  return (
    <>
      <ViewRow style={{ marginTop: 20 }}>
        <TO0
          onPress={showCommentHandler}
          style={{
            paddingLeft: 30,
            paddingVertical: 20,
            paddingRight: 20
          }}
        >
          <Title14 style={!showComments && { color: "rgba(51, 51, 51, 0.5)" }}>
            댓글 {comments.length}
          </Title14>
        </TO0>
        <View
          style={{
            width: 1,
            height: 12,
            backgroundColor: "#c1c1c1"
          }}
        />
        <TO0
          onPress={showVoterHandler}
          style={{ paddingLeft: 20, paddingVertical: 20 }}
        >
          <Title14 style={showComments && { color: "rgba(51, 51, 51, 0.5)" }}>
            제안동의 {voteUsers.length}
          </Title14>
        </TO0>
      </ViewRow>

      {showComments ? (
        <Comments comments={comments} suggestionId={id} scrollRef={scrollRef} />
      ) : (
        <SuggestionVoted voteUsers={voteUsers} />
      )}
    </>
  );
};