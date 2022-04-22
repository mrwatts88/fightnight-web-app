import React, { useContext } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from "react";
import { ABI } from "../../ABI";
import { walletContext } from "../../context/WalletContext";

const Landing = () => {
  const [config, setConfig] = useState({});
  const context = useContext(walletContext);

  async function setup() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            80001: "https://rpc-mumbai.matic.today",
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: "mumbai",
      providerOptions,
    });

    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    if (accounts.length > 0) {
      const balance = await web3.eth.getBalance(accounts[0]);

      let contract = new web3.eth.Contract(ABI, "0x2248C61748dD0c47700688275A04F749C0f22af3");

      const characterBalances = await contract.methods
        .balanceOfBatch([accounts[0], accounts[0], accounts[0], accounts[0]], [0, 1, 2, 3])
        .call();

      const uri = await contract.methods.uri(0).call();

      context.setWalletData({
        account: accounts[0],
        balance: web3.utils.fromWei(balance),
        characterBalances,
        uri,
        contract,
      });
      return {
        account: accounts[0],
        balance: web3.utils.fromWei(balance),
      };
    }
    return {};
  }

  const connect = async () => {
    const config = await setup();
    setConfig(config);
  };

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
          <Link to="/character-inventory">Inventory</Link>&nbsp;&nbsp;&nbsp;<Link to="/fight-logic">Arena</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/world-map">World Map</Link>&nbsp;&nbsp;&nbsp;
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
