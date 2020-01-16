import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useStore } from "../Store";
export default () => {
  const [{ isLoading }] = useStore();
  return <Spinner visible={isLoading} textContent="로딩중입니다..." />;
};
