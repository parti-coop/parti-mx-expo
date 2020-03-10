import React, { ComponentProps } from "react";
import * as SecureStore from "expo-secure-store";
export const PERSIST_KEY = "coop-parti-demos";
import { Updates } from "expo";
export const initialState = {
  isInit: false,
  group_id: null,
  board_id: null,
  user_id: null,
  loading: false
};
type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_GROUP"; group_id: number }
  | { type: "LOGOUT" }
  | {
      type: "SET_GROUP_AND_BOARD";
      group_id: number;
      board_id: number;
    }
  | { type: "APP_REFRESH" };
function reducer(
  state: typeof initialState,
  action: Action
): typeof initialState {
  const { type, ...payload } = action;
  switch (type) {
    case "APP_REFRESH":
      SecureStore.deleteItemAsync(PERSIST_KEY)
        .then(Updates.reload)
        .then(() => SecureStore.getItemAsync(PERSIST_KEY))
        .then(console.log);
      return initialState;
    case "LOGOUT":
      state.user_id = null;
      SecureStore.setItemAsync(PERSIST_KEY, JSON.stringify({ ...state }));
      return state;
    case "SET_GROUP":
    case "SET_GROUP_AND_BOARD":
    default:
      console.log(payload);
      return { ...state, ...payload };
  }
}

export const StoreContext = React.createContext<
  [typeof initialState, (input: Action) => void]
>([initialState, () => {}]);
export const StoreProvider = (props: ComponentProps<any>) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);
  async function init() {
    // const keys = await AsyncStorage.getAllKeys();
    console.log("init");
    try {
      const storeJSON = await SecureStore.getItemAsync(PERSIST_KEY);
      console.log(storeJSON);
      if (storeJSON) {
        dispatch({
          type: "CHANGE_ALL",
          ...initialState,
          ...JSON.parse(storeJSON),
          isInit: true,
          loading: false
        });
      } else {
        const data = JSON.stringify(initialState);
        console.log(data);
        SecureStore.setItemAsync(PERSIST_KEY, data)
          .then(console.log)
          .then(() =>
            dispatch({
              type: "CHANGE_ALL",
              ...initialState,
              isInit: true
            })
          )
          .catch(console.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(() => {
    init();
  }, []);

  return (
    <StoreContext.Provider value={[store, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => React.useContext(StoreContext);
