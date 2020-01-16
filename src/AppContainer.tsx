import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./AppNavigator";
import AuthLoading from "./screens/AuthLoading";
import AuthMain from "./screens/AuthMain";
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      AppNavigator,
      AuthMain
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
export default AppContainer;
