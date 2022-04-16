import React, { useEffect, useState } from "react";
import "./FightLogic.css";
import Hits from "../../components/Hits";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

const FightLogic = () => {
  const [leftFighter, setLeftFighter] = useState({
    side: "left",
    isAttacking: Math.random() < 0.5,
    hitpoints: 100,
    attack: 10,
    defence: 10,
    armour: 15,
    weaponBoost: 10,
    attackPotion: 5,
    shieldPotion: 7,
  });
  const [rightFighter, setRightFighter] = useState({
    side: "right",
    hitpoints: 100,
    attack: 10,
    defence: 10,
    armour: 15,
    weaponBoost: 10,
    attackPotion: 5,
    shieldPotion: 7,
  });

  const [isFighting, setIsFighting] = useState(false);
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    if (isFighting && leftFighter.hitpoints > 0 && rightFighter.hitpoints > 0) {
      doTurn();
    } else {
      setIsFighting(false);
    }
  }, [turns, isFighting]);

  async function doTurn() {
    await timeout(1000);
    const currentAttacker = leftFighter.isAttacking ? leftFighter : rightFighter;
    const { attack, weaponBoost, attackPotion } = currentAttacker;
    const currentDefender = currentAttacker == leftFighter ? rightFighter : leftFighter;
    const { hitpoints, defence, armour, shieldPotion } = currentDefender;
    const defenceEvent = armour + shieldPotion + defence;
    const defenceRoll = randomInt(99);
    const didBlock = defenceRoll < Math.min(defenceEvent, 90);
    const maxHit = attack + attackPotion + weaponBoost;
    const baseHit = randomInt(maxHit);
    const finalDamage = Math.floor(!didBlock ? baseHit : baseHit * (1 - defence / 100));
    const newHp = Math.max(hitpoints - finalDamage, 0);

    setTurns((old) => [
      ...old,
      {
        attacker: {
          side: currentAttacker == leftFighter ? "left" : "right",
          maxHit,
          baseHit,
          finalDamage,
        },
        defender: {
          defence,
          hitpoints: newHp,
          defenceRoll,
          didBlock,
        },
      },
    ]);

    if (currentDefender == leftFighter) {
      setLeftFighter({ ...leftFighter, hitpoints: newHp, isAttacking: true });
    } else {
      setRightFighter({ ...rightFighter, hitpoints: newHp });
      setLeftFighter({ ...leftFighter, isAttacking: false });
    }
  }

  const start = () => {
    setIsFighting(true);
  };

  return (
    <div
      className="fighterPage"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/4063249.jpg")`,
      }}
    >
      <div className="fightLogicHeader">
        <div>
          FightLogic<button onClick={start}>START FIGHT!</button>
        </div>
      </div>
      <div className="fighter">
        <div>
          {turns.map((t, index) => (
            <Hits side={"left"} turnNumber={index + 1} turn={t} />
          ))}
        </div>
        <div className="healthbar">
          <div className="health" style={{ height: `${leftFighter.hitpoints}%` }}>
            {leftFighter.hitpoints}
          </div>
        </div>
      </div>

      <div className="fighter">
        <div>
          {turns.map((t, index) => (
            <Hits side={"right"} turnNumber={index + 1} turn={t} />
          ))}{" "}
        </div>
        <div className="healthbar">
          <div className="health" style={{ height: `${rightFighter.hitpoints}%` }}>
            {" "}
            {rightFighter.hitpoints}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightLogic;
