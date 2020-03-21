import React, { ComponentProps } from "react";
import * as SecureStore from "expo-secure-store";
export const PERSIST_KEY = "coop-parti-demos";
import createReducer from "../store/createReducer";
export const initialState = {
  isInit: false,
  group_id: null,
  board_id: null,
  user_id: null,
  loading: false
};
import { Updates } from "expo";
export type State = typeof initialState;
export type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_GROUP"; group_id: number }
  | { type: "SET_USER"; user_id: number }
  | { type: "LOGOUT" }
  | {
      type: "SET_GROUP_AND_BOARD";
      group_id: number;
      board_id: number;
    }
  | { type: "APP_REFRESH" };
function persistSecureStore(state, payload) {
  const jsonStr = JSON.stringify({ ...state, ...payload });
  SecureStore.setItemAsync(PERSIST_KEY, jsonStr);
  return { ...state, ...payload };
}
export const reducer = createReducer<State, Action>(initialState, {
  ["APP_REFRESH"]: function(state, payload) {
    SecureStore.deleteItemAsync(PERSIST_KEY)
      .then(Updates.reload)
      .then(() => SecureStore.getItemAsync(PERSIST_KEY))
      .then(console.log);
    return initialState;
  },
  ["LOGOUT"]: function(state, payload) {
    state.user_id = null;
    return { ...state };
  },
  ["SET_GROUP"]: persistSecureStore,
  ["SET_GROUP_AND_BOARD"]: persistSecureStore,
  ["SET_USER"]: persistSecureStore
});
