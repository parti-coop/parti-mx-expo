import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./AppNavigator";
import AuthLoading from "./screens/AuthLoading";
import AuthContainer from "./screens/AuthContainer";
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
