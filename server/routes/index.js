const express = require("express");
const router = express.Router();
const LootTable = require("loot-table");

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

const loot = new LootTable();
loot.add("sword", 30);
loot.add("shield", 15);
loot.add("helm", 25);
loot.add(null, 30);

const typeToRangeMap = { sword: { attack: [1, 3], power: [1, 3] }, shield: { defence: [1, 3] }, helm: { defence: [1, 3] } };
const randomFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

router.get("/drop-loot", function (req, res, ny) {
  const item = loot.choose();

  if (!item) {
    return res.json({ item: null });
  }
  const ranges = typeToRangeMap[item];
  let metaData;
  if (item == "sword") {
    const [minAttack, maxAttack] = ranges.attack;
    const attack = randomFromRange(minAttack, maxAttack);
    const [minPower, maxPower] = ranges.power;
    const power = randomFromRange(minPower, maxPower);
    metaData = { type: "sword", attack, power };
  }
  if (["shield", "helm"].includes(item)) {
    const [minDefence, maxDefence] = ranges.defence;
    const defence = randomFromRange(minDefence, maxDefence);
    metaData = { type: item, defence };
  }
  return res.json({ item: metaData });
});

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
