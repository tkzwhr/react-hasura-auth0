import HasuraWithAuth0 from "@tkzwhr/react-hasura-auth0";
import { Suspense } from "react";
import Home from "./Home";

function App() {
  if (import.meta.env.VITE_BYPASS_AUTH0 === "true") {
    return (
      <HasuraWithAuth0
        bypassAuth0={true}
        hasuraUri={import.meta.env.VITE_HASURA_URI}
        token={import.meta.env.VITE_HASURA_TOKEN}
      >
        <Home />
      </HasuraWithAuth0>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HasuraWithAuth0
        bypassAuth0={false}
        hasuraUri={import.meta.env.VITE_HASURA_URI}
        auth0Domain={import.meta.env.VITE_AUTH0_DOMAIN}
        auth0ClientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        auth0RedirectUri={window.location.origin}
        auth0Audience={import.meta.env.VITE_AUTH0_AUDIENCE}
        auth0Scope={import.meta.env.VITE_AUTH0_SCOPE}
      >
        <Home />
      </HasuraWithAuth0>
    </Suspense>
  );
}

export default App;
