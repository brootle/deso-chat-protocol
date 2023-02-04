import { createContext } from "react";
import Deso from "deso-protocol";

type IDesoContext = {
  deso: Deso;
  hasSetupAccount: boolean,
  setHasSetupAccount: (state: boolean) => void;
  loggedInPublicKey: string,
  setLoggedInPublicKey: (state: string) => void;
};

export const DesoContext = createContext<IDesoContext>({
  deso: {} as Deso,
  hasSetupAccount: false,
  setHasSetupAccount: () => {},
  loggedInPublicKey: "",
  setLoggedInPublicKey: () => {},
});