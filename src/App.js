import "./App.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from "react";
import Landing from "./pages/Landing/Landing";
import CharacterInventory from "./pages/CharacterInventory/CharacterInventory";
import FightLogic from "./pages/FightLogic/FightLogic";

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

    return {
      account: accounts[0],
      balance: web3.utils.fromWei(balance),
    };
  }

  return {};
}

function App() {
  const [config, setConfig] = useState({});

  const connect = async () => {
    const config = await setup();
    setConfig(config);
  };

  return (
    <div className="App">
      <Landing config={config} connect={connect} />
      {<CharacterInventory />},{<FightLogic />},
    </div>
  );
}

export default App;
