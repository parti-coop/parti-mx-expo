import React, { ComponentProps } from "react";
import * as SecureStore from "expo-secure-store";
export const PERSIST_KEY = "coop-parti-demos";
import { initialState, reducer, Action, State } from "./store/reducer";

export const StoreContext = React.createContext<
  [State, (input: Action) => void]
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
