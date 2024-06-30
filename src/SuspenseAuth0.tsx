import useSuspenseAuth0 from "@tkzwhr/react-auth0-suspense";
import React from "react";
import { AuthContext } from "./AuthContext";
import GraphQLProvider from "./GraphQLProvider";
import type { BaseProps, State } from "./types";

export type Props = {
  auth0Domain: string;
  auth0ClientId: string;
  auth0RedirectUri: string;
  auth0Audience: string;
  auth0Scope: string;
} & BaseProps;

export default function SuspenseAuth0(props: Props) {
  const auth0 = useSuspenseAuth0({
    domain: props.auth0Domain,
    clientId: props.auth0ClientId,
    redirectUri: props.auth0RedirectUri,
    audience: props.auth0Audience,
    scope: props.auth0Scope,
  });

  const stateValue: State = {
    mode: "auth0",
    auth0,
  };

  if (!auth0.isAuthenticated) {
    return (
      <AuthContext.Provider value={stateValue}>
        {props.children}
      </AuthContext.Provider>
    );
  }

  return (
    <GraphQLProvider
      token={auth0.client.getTokenSilently()}
      uri={props.hasuraUri}
    >
      <AuthContext.Provider value={stateValue}>
        {props.children}
      </AuthContext.Provider>
    </GraphQLProvider>
  );
}
