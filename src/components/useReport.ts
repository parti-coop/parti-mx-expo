import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { showMessage } from "react-native-flash-message";

import { Alert2 } from "./Alert";
import { useStore } from "../Store";
import { fileReport } from "../graphql/mutation";
type reportType = "post" | "comment";
export default function useReport(id: number, type: reportType) {
  const [, dispatch] = useStore();
  const [file, { loading, error }] = useMutation(fileReport, {
    variables: { id, type, body: "신고" },
  });
  if (error) {
    console.log(error);
  }
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading });
  }, [loading]);
  async function report() {
    const res = await file();
    console.log(res);
    showMessage({
      type: "success",
      message: `신고 했습니다`,
    });
  }

  function handler() {
    return Alert2("신고", "해당 글을 신고 하시겠습니까?", report);
  }
  return [handler];
}
