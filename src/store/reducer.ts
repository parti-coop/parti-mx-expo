import React, { ComponentProps } from "react";
import * as SecureStore from "expo-secure-store";
import * as GoogleSignIn from "expo-google-sign-in";
export const PERSIST_KEY = "coop-parti-demos";
import createReducer from "../store/createReducer";
export const initialState = {
  isInit: false,
  group_id: null,
  board_id: null,
  user_id: null,
  loading: false,
};
import { fetchUpdateAsync, reloadAsync } from "expo-updates";
export type State = typeof initialState;
export type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_GROUP"; group_id: number }
  | { type: "SET_USER"; user_id: number }
  | { type: "LOGOUT" }
  | { type: "APP_UPDATE" }
  | { type: "APP_REFRESH" };
function persistSecureStore(state: State, payload: any) {
  const jsonStr = JSON.stringify({ ...state, ...payload });
  SecureStore.setItemAsync(PERSIST_KEY, jsonStr);
  return { ...state, ...payload };
}
export const reducer = createReducer<State, Action>(initialState, {
  ["APP_REFRESH"]: function (state, payload) {
    SecureStore.deleteItemAsync(PERSIST_KEY).then(reloadAsync);
    return initialState;
  },
  ["APP_UPDATE"]: function (state, payload) {
    SecureStore.deleteItemAsync(PERSIST_KEY)
      .then(fetchUpdateAsync)
      .then(reloadAsync);
    return { ...initialState, loading: true };
  },
  ["LOGOUT"]: function (state, payload) {
    GoogleSignIn.signOutAsync();
    return persistSecureStore(state, initialState);
  },
  ["SET_GROUP"]: persistSecureStore,
  ["SET_USER"]: persistSecureStore,
});
