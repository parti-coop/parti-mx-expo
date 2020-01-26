import { createStackNavigator } from "react-navigation-stack";
import AuthMain from "./AuthMain";
import Signup from "./Signup";
import SignupEmail from "./SignupEmail";
import Login from "./Login";
import TermsPrivacy from "./TermsPrivacy";
import TermsService from "./TermsService";
export default createStackNavigator(
  {
    AuthMain,
    Signup,
    Login,
    SignupEmail,
    TermsPrivacy,
    TermsService
  },
  {
    initialRouteName: "AuthMain",
    headerMode: "none"
  }
);
