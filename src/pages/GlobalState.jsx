import React, { createContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] =
    useState(""); /*VARIABILE GLOBALE PER SEARCH*/
  const [newContact, setnewContact] =
    useState(false); /*VARIABILE GLOBALE PER AGGIORNAMENTO DEI CONTATTI*/

  return (
    <GlobalContext.Provider
      value={{ globalData, setGlobalData, newContact, setnewContact }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
