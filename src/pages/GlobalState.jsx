import React, { createContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] =
    useState(""); /*VARIABILE GLOBALE PER SEARCH*/
  const [newContact, setnewContact] =
    useState(false); /*VARIABILE GLOBALE PER AGGIORNAMENTO DEI CONTATTI*/
  const [contactsize, setContactSize] = useState(0);

  return (
    <GlobalContext.Provider
      value={{ globalData, setGlobalData, newContact, setnewContact, contactsize, setContactSize, }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
