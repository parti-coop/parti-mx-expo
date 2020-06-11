import React from "react";
import * as Linking from "expo-linking";
import useNavigateToPost from "../components/useNavigateToPost";
import { boardTypes } from "../types";
import { showMessage } from "react-native-flash-message";
import { useStore } from "../Store";
function validateQueryParams(obj: Object) {
  return (
    obj.hasOwnProperty("id") ||
    obj.hasOwnProperty("type") ||
    obj.hasOwnProperty("group_id")
  );
}
export default function useDeepLinking() {
  const [{ user_id }, dispatch] = useStore();
  const navigatePost = useNavigateToPost();
  React.useEffect(() => {
    Linking.parseInitialURLAsync().then(
      ({ path, queryParams, hostname, scheme }) => {
        console.log(path, scheme, hostname);
        switch (path) {
          case "post":
            if (user_id === null) {
              return showMessage({
                type: "info",
                message: "권한이 없습니다. 먼저 로그인 하세요",
              });
            } else {
              if (validateQueryParams(queryParams)) {
                const { type, id, group_id } = queryParams;
                dispatch({ type: "SET_GROUP", group_id: Number(group_id) });
                navigatePost(type as boardTypes, Number(id));
              }
            }
          default: {
          }
        }
      }
    );
    Linking.addEventListener("url", function ({ url }) {
      showMessage({ type: "default", message: url });
    });
  }, []);
}
