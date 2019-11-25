import React, { PropsWithChildren } from "react";
import { AsyncStorage } from "react-native";
export const PERSIST_KEY = "@parti-coop-2020";

export const initialState = {
  isInit: false,
  userToken: ""
};
export const StoreContext = React.createContext<
  [typeof initialState, Function]
>([initialState, () => {}]);
export const StoreProvider = (props: PropsWithChildren<{}>) => {
  const [store, setStore] = React.useState<typeof initialState>(initialState);
  async function setPersistStore(store: any) {
    await AsyncStorage.setItem(PERSIST_KEY, JSON.stringify(store));
    setStore(store);
  }
  async function init() {
    const storeJSON = await AsyncStorage.getItem(PERSIST_KEY);
    if (storeJSON) {
      try {
        setStore({ ...JSON.parse(storeJSON), isInit: true });
      } catch (error) {
        alert(error);
      }
    } else {
      setPersistStore({ ...initialState, isInit: true });
    }
  }
  React.useEffect(() => {
    init();
  }, []);

  return (
    <StoreContext.Provider value={[store, setPersistStore]}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => React.useContext(StoreContext);
