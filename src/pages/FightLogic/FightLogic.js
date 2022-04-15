import React, { useState } from "react";
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

  const maxHit = attack + attackPotion + weaponBoost;
  const defenceEvent = armour + shieldPotion + defence;

  const hpChange = (newHp) => {
    setHitpoints(newHp);
  };

  //   function timeout(delay: 10000) {
  //     return new Promise((res) => setTimeout(res, delay));
  //   }

  console.log("attack roll =", { attack } + { attackPotion });

  return (
    <div
      className="fighterPage"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/4063249.jpg")`,
      }}
    >
      <div className="fightLogicHeader">
        <div
        // onClick={() => {
        //  fight();
        // }}
        >
          FightLogic
        </div>
      </div>
      <div className="leftFighter">
        attack roll max = {maxHit}, defence = {defenceEvent}
      </div>{" "}
      <div className="rightFighter">right</div>
    </div>
  );
};

export default FightLogic;
