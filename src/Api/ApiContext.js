import React, { useContext } from "react";
import { api } from "./Api";

export const ApiContext = React.createContext();

export const useApi = () => {
    return useContext(ApiContext)
}

export const ApiProvider = ({ children }) => {
  return (
        <ApiContext.Provider value={api}>
            { children }
        </ApiContext.Provider>)
};
