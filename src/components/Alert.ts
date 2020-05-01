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

export function Alert2(
  title = "삭제",
  desc = "삭제 하시겠습니까?",
  handler: (args: any) => any
) {
  return A.alert(title, desc, [
    {
      text: "취소",
      style: "cancel",
    },
    {
      text: "네",
      onPress: handler,
    },
  ]);
}
