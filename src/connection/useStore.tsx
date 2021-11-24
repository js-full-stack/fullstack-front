import React from "react";
import { IStore } from "./storeProvider";
import { StoreContext } from "./storeProvider";

export function useStores(): IStore {
  const store = React.useContext(StoreContext);

  if (!store) {
    throw new Error("StoreProvider is not defined");
  }
  return store;
}
