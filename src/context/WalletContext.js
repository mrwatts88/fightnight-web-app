import React, { useState } from "react";

export const walletContext = React.createContext("defaultValue");

const WalletContext = ({ children }) => {
  const [walletData, setWalletData] = useState({});

  return (
    <>
      <walletContext.Provider value={{ walletData, setWalletData }}> {children}</walletContext.Provider>
    </>
  );
};

export default WalletContext;
