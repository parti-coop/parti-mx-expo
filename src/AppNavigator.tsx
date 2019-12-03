import { createDrawerNavigator } from "react-navigation-drawer";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Suggestions from "./screens/Suggestions";
import SuggestionCreate from "./screens/SuggestionCreate";
import contentComponent from "./components/CustomDrawer";

export default createDrawerNavigator(
  {
    Home,
    Detail,
    Suggestions,
    SuggestionCreate
  },
  {
    initialRouteName: "Suggestions",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent
  }
);
