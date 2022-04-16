import React from "react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Hits = ({
  turn,
  maxHit,
  finalDamage,
  hp,
  newHp,
  defenceRoll,
  baseHit,
  didBlock,
}) => {
  return (
    <div>
      {turn}. max hit {maxHit}, hp is {hp}, base hit is {baseHit}, final hit is{" "}
      {finalDamage}, defenceRoll was {defenceRoll}
      {didBlock ? ", BLOCKED" : ""}, new hp is {newHp}
    </div>
  );
};

export default Hits;
