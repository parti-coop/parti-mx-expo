import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import GroupNew from "./GroupNew";
import Detail from "./Detail";
import SuggestionList from "./SuggestionList";
import SuggestionCreate from "./SuggestionCreate";
import SuggestionEdit from "./SuggestionEdit";
import SuggestionDetail from "./SuggestionDetail";
import QRcode from "./QRcode";
import contentComponent from "../components/CustomDrawer";
const stack = createStackNavigator(
  {
    Detail,
    Home,
    SuggestionList,
    SuggestionCreate,
    SuggestionDetail,
    SuggestionEdit,
    QRcode
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
export default createDrawerNavigator(
  {
    stack,
    GroupNew
  },
  {
    initialRouteName: "stack",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent
  }
);
