import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useStore } from "../Store";
export default () => {
  const [{ loading }, dispatch] = useStore();
  return <Spinner visible={loading} textContent="로딩중입니다..." />
};
