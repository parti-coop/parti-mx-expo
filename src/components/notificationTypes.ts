export const notificationTypes = {
  NULL: null,
  MINE: "mine",
  RELATED: "related",
  ALL: "all",
};

export const notificationOptions = [
  { value: notificationTypes.MINE, label: "내 글 알림 받기" },
  { value: notificationTypes.RELATED, label: "내 글/참여글 알림 받기" },
  { value: notificationTypes.ALL, label: "모든 알림 받기" },
  { value: notificationTypes.NULL, label: "알림 끄기" },
];
