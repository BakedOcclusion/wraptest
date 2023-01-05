import { Fragment, useState, useEffect } from "react";
import "./styles.css";

import { useContractCall, useContractFunction, useEthers } from "@usedapp/core";
import MintList from "./MintList";

//importing media assets
import logoimg from "./assets/logo/logo.png";
import nightimg from "./assets/icons/nightimg.svg";
import dayimg from "./assets/icons/dayimg.svg";
import nightmode from "./assets/icons/nightmode.svg";
import daymode from "./assets/icons/daymode.svg";

export default function App() {
  const { activateBrowserWallet, account } = useEthers();

  const [myData, setMyData] = useState({ connect: "", theme: false });
  const [darkTheme, setDarkTheme] = useState(false);
  const [lootInput, setLootInput] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [mints, setMints] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setDarkTheme(data.theme);
    }
  }, []);

  //const totalSpellbooks = getSpellbookCount();

  function handleMint() {
    const _token = parseInt(tokenInput);
    if (_token && _token > 8000) {
      setMints(mints.concat(_token));
    }
  }

  function handleMintWithLoot() {
    const _token = parseInt(lootInput);
    if (_token && _token < 8001) {
      setMints(mints.concat(_token));
    }
  }

  function handleLootInput(event) {
    setLootInput(event.target.value);
  }

  function handleTokenInput(event) {
    setTokenInput(event.target.value);
  }

  async function onClickConnect() {
    activateBrowserWallet();
  }

  const handleThemeToggler = async () => {
    setDarkTheme(!darkTheme);
    setMyData({ theme: darkTheme });
    localStorage.setItem("user", JSON.stringify(myData));
  };

  //rendering Header
  const renderHeader = (
    <div className={darkTheme ? "header dark" : "header"}>
      <div className="header-block">
        {darkTheme ? (
          <div className="mode">
            <img src={dayimg} alt="dayimg" />
            <span>Day mode</span>
            <img
              src={nightmode}
              alt="mode"
              onClick={handleThemeToggler}
              style={{
                cursor: "pointer",
                width: 25,
                filter: darkTheme ? "invert(1)" : "invert(0)"
              }}
            />
          </div>
        ) : (
          <div className="mode">
            <img src={nightimg} alt="nightimg" />
            <span>Night mode</span>
            <img
              src={daymode}
              alt="mode"
              onClick={handleThemeToggler}
              style={{
                cursor: "pointer",
                width: 25,
                filter: darkTheme ? "invert(1)" : "invert(0)"
              }}
            />
          </div>
        )}
        <button className="button" onClick={onClickConnect}>
          {!account && <p>Connect Wallet</p>}
          {account && <p>{account}</p>}
        </button>
      </div>
    </div>
  );

  //rendering form In

  //rendering form Out
  const renderMintForm = (
    <div className={darkTheme ? "input dark" : "input"}>
      <div>
        <span>Magnum Wrap</span>
      </div>
      <input
        type="number"
        name="tokenId"
        placeholder="tokenId"
        // value={tokenId}
        onChange={handleTokenInput}
      />
      <p>Valid range: 0-9999</p>
      <button className="button" onClick={handleMint}>
        Mint Public
      </button>
      <p>Cost: Free! (just gas)</p>
    </div>
  );

  //rendering form
  const renderForm = <Fragment>{renderMintForm}</Fragment>;

  return (
    <div className={darkTheme ? "App dark" : "App"}>
      <div className="content">
        {renderHeader}
        <>
          <div className={darkTheme ? "swapper dark" : "swapper"}>
            <div className="block logo">
              <img src={logoimg}></img>
            </div>
            <div className={darkTheme ? "title dark" : "title"}>
              <h1>Spells for Looters</h1>
            </div>
            <ul className={darkTheme ? "links dark" : "links"}>
              <li>
                <a
                  href="https://opensea.io/collection/spells-for-looters"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenSea
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/lootspells"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://etherscan.io/address/0x808f518866aa95afdef9bd0330bcbf56483fa98e"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contract
                </a>
              </li>
            </ul>

            <div className="instructions">
              <p>
                Mint your spellbooks here. The spells in your spellbooks will be
                selected randomly with the token as a seed.
              </p>
              <MintList tokens={mints} />
            </div>
            <div className="block">
              <div className="form">{renderForm}</div>
            </div>
            <div className="instructions">
              <p>Total Spellbooks minted: 0</p>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
