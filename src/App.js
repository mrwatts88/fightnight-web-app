import './App.css';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from 'react';

async function setup() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          80001: "https://rpc-mumbai.matic.today"
        }
      }
    }
  };

  const web3Modal = new Web3Modal({
    network: "mumbai",
    providerOptions
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
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://i.pinimg.com/originals/8d/6f/f3/8d6ff31f94e244db66e9e96bb87dfa70.gif"
          alt="logo" />
        <p>
          Welcome to Fight Night.
        </p>
        {!config.account ?
          <button onClick={connect}>Connect Wallet</button> :
          <>
            <p/>
            <small>
              Wallet Address: {config.account}
            </small>
            <small>
              Balance: {config.balance} MATIC
            </small>
          </>
        }
      </header>
    </div>
  );
}

export default App;
