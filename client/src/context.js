import React, { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.localStorage.getItem("token");
  });

  const value = {
    isAuth,
    activateAuth: () => {
      setIsAuth(true);
    },

    removeAuth: () => {
      setIsAuth(false);
      window.localStorage.removeItem("token");
    }
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default {
  Provider,
  Consumer: Context.Consumer
};
