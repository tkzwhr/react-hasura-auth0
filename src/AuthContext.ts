import { createContext } from "react";
import type { State } from "./types";

export const AuthContext = createContext<State>({ mode: "jwt" });
