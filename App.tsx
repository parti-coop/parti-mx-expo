import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./src/AppNavigator";
import AuthLoading from "./src/screens/AuthLoading";
import AuthMain from "./src/screens/AuthMain";
import { StoreProvider } from "./src/Store";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "node-fetch";
import * as Font from "expo-font";
declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch;
    }
  }
}
global.fetch = fetch;
const client = new ApolloClient({
  uri: "https://parti-2020.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "parti"
  }
});
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
export default () => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <AppContainer />
      </StoreProvider>
    </ApolloProvider>
  );
};
