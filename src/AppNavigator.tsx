import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Suggestions from "./screens/Suggestions";
import SuggestionCreate from "./screens/SuggestionCreate";
import SuggestionEdit from "./screens/SuggestionEdit";
import SuggestionDetail from "./screens/SuggestionDetail";
import contentComponent from "./components/CustomDrawer";
const stack = createStackNavigator(
  {
    Home,
    Detail,
    Suggestions,
    SuggestionCreate,
    SuggestionDetail,
    SuggestionEdit
  },
  {
    initialRouteName: "Suggestions",
    headerMode: "none"
  }
);
export default createDrawerNavigator(
  {
    stack
  },
  {
    initialRouteName: "stack",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent
  }
);
