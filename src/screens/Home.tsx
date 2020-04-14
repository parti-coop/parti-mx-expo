import React from "react";
import { Text } from "../components/Text";
import { useStore } from "../Store";
import { TO1 } from "../components/TouchableOpacity";
import ViewGroupHome from "../components/ViewGroupHome";

export default (props) => {
  const [{ group_id, user_id }] = useStore();
  React.useEffect(() => {
    if (group_id === null) {
      props.navigation.openDrawer();
    }
  }, []);
  if (group_id !== null && user_id !== null) {
    return <ViewGroupHome />;
  } else {
    return (
      <TO1 onPress={props.navigation.openDrawer}>
        <Text>사이드 바에서 그룹을 선택하세요.</Text>
      </TO1>
    );
  }
};
