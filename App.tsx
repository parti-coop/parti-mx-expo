import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AppContainer from "./src/screens/AppContainer";
import { StoreProvider } from "./src/Store";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import FlashMessage from "react-native-flash-message";
import LoadingIndicator2 from "./src/components/LoadingIndicator2";

const wsLink = new WebSocketLink({
  uri: `ws://parti-2020.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: { "x-hasura-admin-secret": "parti" }
    }
  }
});

const httpLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: "https://parti-2020.herokuapp.com/v1/graphql",
    credentials: "same-origin",
    headers: {
      "x-hasura-admin-secret": "parti"
    }
  })
]);

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch;
    }
  }
}
global.fetch = fetch;
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class App extends React.PureComponent {
  state = {
    isReady: false
  };

  async _cacheResourcesAsync() {
    return Font.loadAsync({
      notosans: require("./assets/NotoSansCJKkr-Regular.otf")
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <StoreProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <AppContainer />
              <FlashMessage ref="myLocalFlashMessage" />
              <LoadingIndicator2 />
            </SafeAreaView>
          </SafeAreaProvider>
        </StoreProvider>
      </ApolloProvider>
    );
  }
}
