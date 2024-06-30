import type { Result } from "@tkzwhr/react-auth0-suspense";
import type React from "react";

export type BaseProps = {
  hasuraUri: string;
  children: React.ReactNode;
};

export type State =
  | {
      mode: "jwt";
    }
  | {
      mode: "auth0";
      auth0: Result;
    };
