import React, { MutableRefObject } from "react";

import { Title14 } from "./Text";
import { View, ViewRow } from "./View";
import { TO0 } from "./TouchableOpacity";
import EventParticipants from "./EventParticipants";
import Comments from "./Comments";

export default function EventTabs(props: {
  comments: any;
  users: Array<{ name: string; created_at: string; photo_url: string }>;
  id: number;
  scrollRef: MutableRefObject<any>;
}) {
  const { comments, users, id, scrollRef } = props;
  const [showComments, setShowComments] = React.useState(true);
  const isFirstRun = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    scrollRef.current.scrollToEnd();
  }, [showComments]);

  function showCommentHandler() {
    setShowComments(true);
  }
  function showVoterHandler() {
    setShowComments(false);
  }

  return (
    <>
      <ViewRow style={{ marginTop: 20 }}>
        <TO0
          onPress={showCommentHandler}
          style={{
            paddingLeft: 30,
            paddingVertical: 20,
            paddingRight: 20,
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
            backgroundColor: "#c1c1c1",
          }}
        />
        <TO0
          onPress={showVoterHandler}
          style={{ paddingLeft: 20, paddingVertical: 20 }}
        >
          <Title14 style={showComments && { color: "rgba(51, 51, 51, 0.5)" }}>
            제안동의 {users.length}
          </Title14>
        </TO0>
      </ViewRow>

      {showComments ? (
        <Comments comments={comments} postId={id} scrollRef={scrollRef} />
      ) : (
        <EventParticipants users={users} />
      )}
    </>
  );
}
