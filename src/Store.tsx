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
  isLoading: false
};
export const StoreContext = React.createContext<
  [typeof initialState, Function, Function]
>([initialState, () => {}, () => {}]);
export const StoreProvider = (props: ComponentProps<any>) => {
  const [store, setStore] = React.useState<typeof initialState>(initialState);
  async function setPersistStore(_store: any) {
    Object.assign(store, _store);
    await AsyncStorage.setItem(PERSIST_KEY, JSON.stringify(store));
    setStore(store);
  }
  async function init() {
    const storeJSON = await AsyncStorage.getItem(PERSIST_KEY);
    if (storeJSON) {
      try {
        setStore({ ...initialState, ...JSON.parse(storeJSON), isInit: true });
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
    <StoreContext.Provider value={[store, setPersistStore, setStore]}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => React.useContext(StoreContext);
