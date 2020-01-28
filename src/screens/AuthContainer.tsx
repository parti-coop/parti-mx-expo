import { createStackNavigator } from "react-navigation-stack";
import AuthMain from "./AuthMain";
import Signup from "./Signup";
import SignupEmail from "./SignupEmail";
import Login from "./Login";
import LoginEmail from "./LoginEmail";
import TermsPrivacy from "./TermsPrivacy";
import TermsService from "./TermsService";
export default createStackNavigator(
  {
    AuthMain,
    Signup,
    SignupEmail,
    Login,
    LoginEmail,
    TermsPrivacy,
    TermsService
  },
  {
    initialRouteName: "AuthMain",
    headerMode: "none"
  }
);
