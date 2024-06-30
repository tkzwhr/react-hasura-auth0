import React from "react";
import { AuthContext } from "./AuthContext";
import GraphQLProvider from "./GraphQLProvider";
import SuspenseAuth0 from "./SuspenseAuth0";
import type { Props as SuspenseAuth0Props } from "./SuspenseAuth0";
import type { BaseProps, State } from "./types";

type Props =
  | ({
      bypassAuth0: true;
      token: string;
    } & BaseProps)
  | ({
      bypassAuth0: false;
    } & SuspenseAuth0Props);

export function HasuraWithAuth0(props: Props) {
  if (props.bypassAuth0) {
    const stateValue: State = {
      mode: "jwt",
    };
    return (
      <GraphQLProvider
        token={Promise.resolve(props.token)}
        uri={props.hasuraUri}
      >
        <AuthContext.Provider value={stateValue}>
          {props.children}
        </AuthContext.Provider>
      </GraphQLProvider>
    );
  }

  return (
    <SuspenseAuth0
      hasuraUri={props.hasuraUri}
      auth0Domain={props.auth0Domain}
      auth0ClientId={props.auth0ClientId}
      auth0RedirectUri={props.auth0RedirectUri}
      auth0Audience={props.auth0Audience}
      auth0Scope={props.auth0Scope}
    >
      {props.children}
    </SuspenseAuth0>
  );
}
