import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthContainer from "./AuthContainer";
import { auth } from "../firebase";
export default () => {
  const [user, setUser] = React.useState(undefined);
  React.useEffect(() => {
    return auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthContainer />}
    </NavigationContainer>
  );
};
