import React from 'react'

const Landing = ({ config, connect }) => {
  return (
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
  )
}

export default Landing