import React, { useEffect, useState } from "react";
import "./FightLogic.css";
import Hits from "../../components/Hits";

const FightLogic = () => {
  const [hitpoints, setHitpoints] = useState(100);
  const [attack, setAttack] = useState(10);
  const [defence, setDefence] = useState(10);
  const [armour, setArmour] = useState(15);
  const [weaponBoost, setWeaponBoost] = useState(10);
  const [attackPotion, setAttackPotion] = useState(5);
  const [shieldPotion, setShieldPotion] = useState(7);
  const [turns, setTurns] = useState([]);
  const maxHit = attack + attackPotion + weaponBoost;
  const defenceEvent = armour + shieldPotion + defence;
  const [isFighting, setIsFighting] = useState(false);

  const hpChange = (newHp) => {
    setHitpoints(newHp);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // console.log("attack roll =", attack + attackPotion);

  function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  useEffect(() => {
    if (isFighting && hitpoints > 0) {
      console.log(hitpoints);
      doTurn();
    } else {
      setIsFighting(false);
    }
  }, [turns, isFighting]);

  async function doTurn() {
    await timeout(1000);
    const baseHit = randomInt(maxHit);
    const defenceRoll = randomInt(99);
    const didBlock = defenceRoll < Math.min(defenceEvent, 90);
    const finalDamage = Math.floor(
      !didBlock ? baseHit : baseHit * (1 - defence / 100)
    );
    const newHp = Math.max(hitpoints - finalDamage, 0);
    // const newHp = hitpoints - finalDamage;
    setTurns((old) => [
      ...old,
      {
        maxHit,
        hitpoints,
        defence,
        baseHit,
        finalDamage,
        defenceRoll,
        didBlock,
        newHp,
      },
    ]);
    setHitpoints(newHp);
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
      <div className="leftFighter">
        {turns.map((t, index) => (
          <Hits
            turn={index + 1}
            maxHit={t.maxHit}
            hp={t.hitpoints}
            defence={t.defence}
            baseHit={t.baseHit}
            finalDamage={t.finalDamage}
            defenceRoll={t.defenceRoll}
            didBlock={t.didBlock}
            newHp={t.newHp}
          ></Hits>
        ))}
      </div>
      <div className="rightFighter">right</div>
    </div>
  );
};

export default FightLogic;
