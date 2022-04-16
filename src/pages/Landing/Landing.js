import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = ({ config, connect }) => {
  return (
    <header
      className="App-header"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1559442.jpg")`,
      }}
    >
      <div className="inner">
        <h3 className="itemd">Welcome to Fight Night.</h3>
        <div className="navButton">
          <Link to="/character-inventory">Inventory</Link>&nbsp;&nbsp;&nbsp;<Link to="/fight-logic">Arena</Link>
        </div>
        {!config.account ? (
          <button onClick={connect}>Connect Wallet</button>
        ) : (
          <>
            <small className="walletInfo">Wallet Address: {config.account}</small>
          </>
        )}
      </div>
    </header>
  );
};

export default Landing;
