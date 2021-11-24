import { Instance } from "mobx-state-tree";
import React from "react";
import { RootStore } from "../storage/RootStore";
export const store = RootStore.create({});

export interface IStore extends Instance<typeof RootStore> {}

export const StoreContext = React.createContext<IStore | null>(store);

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
