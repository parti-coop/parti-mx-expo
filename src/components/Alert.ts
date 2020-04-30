import { Alert as A } from "react-native";

export function Alert1(
  title = "서비스 검토 중",
  desc = "조금만 더 기다려주세요"
) {
  return A.alert(title, desc, [
    {
      text: "확인",
      style: "cancel",
    },
  ]);
}
