var express = require("express");
var router = express.Router();

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Expressssssssss" });
});

router.get("/fight-results", function (req, res, next) {
  const leftFighter = {
    side: "left",
    isAttacking: Math.random() < 0.5,
    hitpoints: 100,
    attack: 10,
    defence: 10,
    armour: 15,
    weaponBoost: 10,
    attackPotion: 5,
    shieldPotion: 7,
  };
  const rightFighter = {
    side: "right",
    hitpoints: 100,
    attack: 10,
    defence: 10,
    armour: 15,
    weaponBoost: 10,
    attackPotion: 5,
    shieldPotion: 7,
  };
  const turns = [];

  while (leftFighter.hitpoints > 0 && rightFighter.hitpoints > 0) doTurn(turns, leftFighter, rightFighter);

  res.json({ turns });
});

module.exports = router;
async function doTurn(turns, leftFighter, rightFighter) {
  const currentAttacker = leftFighter.isAttacking ? leftFighter : rightFighter;
  const { attack, weaponBoost, attackPotion } = currentAttacker;
  const currentDefender = currentAttacker === leftFighter ? rightFighter : leftFighter;
  const { hitpoints, defence, armour, shieldPotion } = currentDefender;
  const defenceEvent = armour + shieldPotion + defence;
  const defenceRoll = randomInt(99);
  const didBlock = defenceRoll < Math.min(defenceEvent, 90);
  const maxHit = attack + attackPotion + weaponBoost;
  const baseHit = randomInt(maxHit);
  const finalDamage = Math.floor(!didBlock ? baseHit : baseHit * (1 - defence / 100));
  const newHp = Math.max(hitpoints - finalDamage, 0);

  turns.push({
    attacker: {
      side: currentAttacker === leftFighter ? "left" : "right",
      maxHit,
      baseHit,
      finalDamage,
      hitpoints: leftFighter === currentAttacker ? leftFighter.hitpoints : rightFighter.hitpoints,
    },
    defender: {
      defence,
      hitpoints: newHp,
      defenceRoll,
      didBlock,
    },
  });

  if (currentDefender === leftFighter) {
    leftFighter.hitpoints = newHp;
    leftFighter.isAttacking = true;
  } else {
    rightFighter.hitpoints = newHp;
    leftFighter.isAttacking = false;
  }
}
