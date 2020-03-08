import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthMain from "./AuthMain";
import Signup from "./Signup";
import SignupEmail from "./SignupEmail";
import Login from "./Login";
import LoginEmail from "./LoginEmail";
import TermsPrivacy from "./TermsPrivacy";
import TermsService from "./TermsService";
import PasswordFind from "./PasswordFind";
const Stack = createStackNavigator();
export default function() {
  return (
    <Stack.Navigator initialRouteName="AuthMain" headerMode="none">
      <Stack.Screen name="AuthMain" component={AuthMain} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignupEmail" component={SignupEmail} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="TermsPrivacy" component={TermsPrivacy} />
      <Stack.Screen name="TermsService" component={TermsService} />
      <Stack.Screen name="PasswordFind" component={PasswordFind} />
    </Stack.Navigator>
  );
}
