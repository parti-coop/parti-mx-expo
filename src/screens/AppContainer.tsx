import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./AppNavigator";
import AuthLoading from "./AuthLoading";
import AuthContainer from "./AuthContainer";
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      AppNavigator,
      AuthContainer
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
export default AppContainer;
