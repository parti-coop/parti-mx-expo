import iconNewsGray from "../../assets/iconNewsGray.png";
import iconCommunityGray from "../../assets/iconCommunityGray.png";
import iconSuggestGray from "../../assets/iconSuggestGray.png";
import iconVoteGray from "../../assets/iconVoteGray.png";

export enum boardTypes {
  NOTICE = "notice",
  SUGGESTION = "suggestion",
  EVENT = "event",
  VOTE = "vote",
}

export const boardOptions = [
  { value: boardTypes.NOTICE, label: "소식", icon: iconNewsGray },
  { value: boardTypes.SUGGESTION, label: "제안", icon: iconSuggestGray },
  { value: boardTypes.EVENT, label: "모임", icon: iconCommunityGray },
  { value: boardTypes.VOTE, label: "투표", icon: iconVoteGray },
];
