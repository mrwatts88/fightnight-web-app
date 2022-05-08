/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import "./FightLogic.css";
import Hits from "../../components/Hits";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const FightLogic = () => {
  const [finalResults, setFinalResults] = useState([]);
  const [turns, setTurns] = useState([]);

  const audioEl = useRef();

  const [isFighting, setIsFighting] = useState(false);

  const history = useNavigate();
  const rightHitpoints = (turns) => {
    return turns.length == 0
      ? 100
      : turns[turns.length - 1].attacker.side == "left"
      ? turns[turns.length - 1].defender.totalHp
      : turns[turns.length - 1].attacker.totalHp;
  };
  const leftHitpoints = (turns) => {
    return turns.length == 0
      ? 100
      : turns[turns.length - 1].attacker.side == "left"
      ? turns[turns.length - 1].attacker.totalHp
      : turns[turns.length - 1].defender.totalHp;
  };

  const leftInitialHp = (turns) => {
    return turns.length == 0 ? 100 : turns[0].attacker.side == "left" ? turns[0].attacker.totalHp : turns[0].defender.totalHp;
  };

  const rightInitialHp = (turns) => {
    return turns.length == 0 ? 100 : turns[0].attacker.side == "left" ? turns[0].defender.totalHp : turns[0].attacker.totalHp;
  };

  const goBack = () => {
    history("/");
  };

  useEffect(() => {
    if (isFighting && turns.length < finalResults.length) {
      doTurn();
    } else {
      setIsFighting(false);
      const player = audioEl.current.audioEl.current;
      player.pause();
    }
  }, [turns, isFighting]);

  const getFightResults = async () => {
    const player = audioEl.current.audioEl.current;
    player.play();
    //const result = await fetch("https://fightnightserver.onrender.com/fight-results");
    const result = await fetch("http://localhost:3001/fight-results");
    const json = await result.json();
    console.log(json.turns);
    setFinalResults(json.turns);
    setIsFighting(true);
  };

  async function doTurn() {
    await timeout(1000);

    setTurns(finalResults.slice(0, turns.length + 1));
  }

  return (
    <div
      className="fighterPage"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/4063249.jpg")`,
      }}
    >
      <div
        style={{
          position: "fixed",
          top: -5,
          left: 15,
          fontSize: 48,
          cursor: "pointer",
        }}
        onClick={goBack}
      >
        «
      </div>
      <ReactAudioPlayer volume={0.008} ref={audioEl} src="bensound-epic.mp3" />
      <div className="fightLogicHeader">
        <div>
          FightLogic<button onClick={getFightResults}>START FIGHT!</button>
        </div>
      </div>
      <div className="fighter">
        <div>
          {turns.map((t, index) => (
            <Hits side={"left"} key={index} turnNumber={index + 1} turn={t} />
          ))}
        </div>
        <div className="healthbar">
          <div className="health" style={{ height: `${(leftHitpoints(turns) / leftInitialHp(turns)) * 100}%` }}>
            {leftHitpoints(turns)}
          </div>
        </div>
      </div>

      <div className="fighter">
        <div>
          {turns.map((t, index) => (
            <Hits side={"right"} key={index} turnNumber={index + 1} turn={t} />
          ))}{" "}
        </div>
        <div className="healthbar">
          <div className="health" style={{ height: `${(rightHitpoints(turns) / rightInitialHp(turns)) * 100}%` }}>
            {" "}
            {rightHitpoints(turns)}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightLogic;
