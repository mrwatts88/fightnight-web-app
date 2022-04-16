import React from "react";

const Hits = ({ turnNumber, turn, side }) => {
  if (side == turn.attacker.side) {
    const { maxHit, baseHit, finalDamage } = turn.attacker;

    return (
      <div>
        {turnNumber}. max hit {maxHit}, base hit is {baseHit}, final hit is {finalDamage}
      </div>
    );
  } else {
    const { defenceRoll, didBlock, hitpoints } = turn.defender;

    return (
      <div>
        {turnNumber}. defenceRoll was {defenceRoll}
        {didBlock ? ", BLOCKED" : ""}, new hp is {hitpoints}
      </div>
    );
  }
};

export default Hits;
