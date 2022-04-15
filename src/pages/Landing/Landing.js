import React from "react";
import "./Landing.css";

const Landing = ({ config, connect }) => {
  return (
    <header
      className="App-header"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1559442.jpg")`,
      }}
    >
      <h3 className="itemd">Welcome to Fight Night.</h3>
      {!config.account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <>
          <p />
          <small>Wallet Address: {config.account}</small>
          <small>Balance: {config.balance} MATIC</small>
        </>
      )}
    </header>
  );
};

export default Landing;
