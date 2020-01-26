import React, { ComponentProps } from "react";
import { AsyncStorage } from "react-native";
export const PERSIST_KEY = "@parti-coop-2020";

export const initialState = {
  isInit: false,
  userToken: "",
  group_id: 0,
  board_id: 0,
  created_by: 1,
  updated_by: 1,
  user_id: 1,
  loading: false
};
type Action =
  | { type: "CHANGE_ALL"; isInit: boolean }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_GROUP"; group_id: number }
  | { type: "SET_TOKEN"; userToken: string }
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
      AsyncStorage.removeItem(PERSIST_KEY);
      return initialState;
    // case "SET_LOADING":
    // case "CHANGE_ALL":
    // case "SET_GROUP":
    // case "SET_GROUP_AND_BOARD":
    // case "SET_TOKEN":
    default:
      return { ...state, ...payload };
  }
}

export const StoreContext = React.createContext<
  [typeof initialState, (input: Action) => void]
>([initialState, () => {}]);
export const StoreProvider = (props: ComponentProps<any>) => {
  const [store, dispatch] = React.useReducer(reducer, initialState);
  async function init() {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.indexOf(PERSIST_KEY) > -1) {
      const storeJSON = await AsyncStorage.getItem(PERSIST_KEY);
      dispatch({
        type: "CHANGE_ALL",
        ...initialState,
        ...JSON.parse(storeJSON),
        isInit: true
      });
    } else {
      await AsyncStorage.setItem(PERSIST_KEY, JSON.stringify({ initialState }));
      dispatch({
        type: "CHANGE_ALL",
        ...initialState,
        isInit: true
      });
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
