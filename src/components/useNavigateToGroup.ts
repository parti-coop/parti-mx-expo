import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useMutation } from "@apollo/react-hooks";
import { incrementUserGroupCheck } from "../graphql/mutation";
import { useStore } from "../Store";

export default function useNavigateToBoard() {
  const { navigate, dispatch } = useNavigation();
  const [{ user_id }, dispatchStore] = useStore();
  const [increment] = useMutation(incrementUserGroupCheck);
  function goToGroup(group_id: number) {
    dispatchStore({ type: "SET_GROUP", group_id });
    navigate("Home");
    increment({
      variables: { group_id, user_id },
    });
    dispatch(DrawerActions.closeDrawer());
  }

  return goToGroup;
}
