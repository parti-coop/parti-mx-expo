import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AuthSwitcher from "./src/screens/AuthSwitcher";
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
import { setContext } from "apollo-link-context";
import { auth } from "./src/firebase";
const HASURA_DOMAIN = `hasura-load-balancer-1241189389.ap-northeast-2.elb.amazonaws.com/v1/graphql`;

const wsLink = new WebSocketLink({
  uri: `ws://${HASURA_DOMAIN}`,
  options: {
    reconnect: true,
    connectionParams: getFirebaseAuthHeader
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
    uri: `http://${HASURA_DOMAIN}`,
    credentials: "same-origin",
    // headers: { "x-hasura-admin-secret": "parti" }
  })
]);

const link = split(
  // split based on operation type
  ({ query }) => {
    //
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
async function getFirebaseAuthHeader(_previousHeader?: Object) {
  const header = {};
  if (_previousHeader) {
    Object.assign(header, _previousHeader);
  }
  let token = null;
  try {
    token = await auth.currentUser.getIdToken();
  } catch (error) {
    console.log("not logged in");
  }

  if (token) {
    const Authorization = "Bearer " + token;
    return { headers: { ...header, Authorization } };
  }
  return { headers: { ...header, "x-hasura-admin-secret": "parti" } };
}
const authLink = setContext((_, { headers }) => getFirebaseAuthHeader(headers));
declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch;
    }
  }
}
global.fetch = fetch;
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

export default class App extends React.PureComponent {
  state = {
    isReady: false
  };

  async _cacheResourcesAsync() {
    return Font.loadAsync({
      notosans: require("./assets/NotoSansCJKkr-Regular.otf"),
      notosans500: require("./assets/NotoSansCJKkr-Medium.otf")
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
              <AuthSwitcher />
              <FlashMessage ref="myLocalFlashMessage" />
              <LoadingIndicator2 />
            </SafeAreaView>
          </SafeAreaProvider>
        </StoreProvider>
      </ApolloProvider>
    );
  }
}
