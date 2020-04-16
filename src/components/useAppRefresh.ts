import react from "react";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { useStore } from "../Store";
import { checkForUpdateAsync } from "expo-updates";

const { revisionId } = Constants.manifest;
// async function getLastPublishTime() {
//   const json = await fetch(
//     `https://exp.host/${id}/index.exp?sdkVersion=36.0.0`
//   ).then((res) => res.json());
//   if (json.sdkVersion === sdkVersion) {
//     if (json.revisionId !== revisionId) {
//       return { ...json, hasUpdate: true };
//     }
//   }
//   return { ...json, hasUpdate: false };
// }
export default function () {
  const [, dispatch] = useStore();
  async function refresh(json?: any) {
    return Alert.alert(
      "업데이트",
      `업데이트 된 앱이 있습니다. 새로 다운받고 시작하시겠습니까?
      \n 현재 앱 버전: ${revisionId}
      \n 다음 앱 버전: ${json?.revisionId}`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "update",
          onPress: () => dispatch({ type: "APP_UPDATE" }),
        },
      ]
    );
  }
  async function refreshApp() {
    // const json = await getLastPublishTime();
    try {
      const res = await checkForUpdateAsync();
      if (res.isAvailable) {
        const json = res.manifest;
        refresh(json);
      } else {
        Alert.alert("최신 버전입니다.", `revision: ${revisionId}`);
      }
    } catch (error) {
      Alert.alert("리로드", `리로드 하시겠습니까?`, [
        { text: "취소", style: "cancel" },
        {
          text: "reload",
          onPress: () => dispatch({ type: "APP_REFRESH" }),
        },
      ]);
    }
  }
  return refreshApp;
}
