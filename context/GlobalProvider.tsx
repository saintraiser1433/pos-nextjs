'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type GlobalState = {
  title: string;
};
const DEFAULT_STATE: GlobalState = {
  title: 'Default Title',
};

type GlobalContextType = {
  state: GlobalState | null;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

const GlobalContext = createContext({} as GlobalContextType);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GlobalState>(DEFAULT_STATE);
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
