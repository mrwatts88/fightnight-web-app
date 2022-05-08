const express = require("express");
const router = express.Router();
const LootTable = require("loot-table");

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

const ethers = require("ethers");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK("6e59e321836fcbf43e23", "fa05be203a52fd6706d49b7b6332fff8ae7f1e712574b8c1106fd18858fa0f9d");

const loot = new LootTable();
loot.add("sword", 30);
loot.add("shield", 15);
loot.add("helm", 25);
loot.add(null, 30);

const lootToImageMap = {
  sword: "https://gateway.pinata.cloud/ipfs/QmQxDXn39Sgou8exRJZiwUaqCMWw8WyDKSScp6kvjeytGC",
  shield: "https://gateway.pinata.cloud/ipfs/QmfKvjozYn2Nfc5bmqNQMQS5t7Kc9uvMvNdPQavpipcw4w",
  helm: "https://gateway.pinata.cloud/ipfs/QmNWhb4xTEFCnwzW1K5psbrzJQo2hFpzXxo32YrTzDveic",
};

const typeToRangeMap = { sword: { attack: [1, 3], power: [1, 3] }, shield: { defence: [1, 3] }, helm: { defence: [1, 3] } };
const randomFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

router.get("/drop-loot", async function (req, res, ny) {
  const item = loot.choose();

  if (!item) {
    return res.json({ item: null });
  }
  const ranges = typeToRangeMap[item];
  let metaData;
  if (item === "sword") {
    const [minAttack, maxAttack] = ranges.attack;
    const attack = randomFromRange(minAttack, maxAttack);
    const [minPower, maxPower] = ranges.power;
    const power = randomFromRange(minPower, maxPower);
    metaData = {
      description: "pointy stick",
      image: lootToImageMap[item],
      name: "sword",
      attributes: [
        {
          trait_type: "Level",
          value: 5,
        },
        {
          display_type: "boost_number",
          trait_type: "Power",
          value: power,
        },
        {
          display_type: "boost_number",
          trait_type: "Attack",
          value: attack,
        },
      ],
    };
  }
  if (item === "shield") {
    const [minDefence, maxDefence] = ranges.defence;
    const defence = randomFromRange(minDefence, maxDefence);
    metaData = {
      description: "flat board",
      image: lootToImageMap[item],
      name: "shield",
      attributes: [
        {
          trait_type: "Level",
          value: 5,
        },
        {
          display_type: "boost_number",
          trait_type: "Defence",
          value: defence,
        },
      ],
    };
  }
  if (item === "helm") {
    const [minDefence, maxDefence] = ranges.defence;
    const defence = randomFromRange(minDefence, maxDefence);
    metaData = {
      description: "head piece",
      image: lootToImageMap[item],
      name: "helm",
      attributes: [
        {
          trait_type: "Level",
          value: 5,
        },
        {
          display_type: "boost_number",
          trait_type: "Defence",
          value: defence,
        },
      ],
    };
  }

  try {
    const result = await pinata.pinJSONToIPFS(metaData, {});
    const daiAddress = "0x53D180acf8bbBB3A6dA4148D831F9f7bab6Ee550";
    const daiAbi = ["function safeMint(address to, string uri)"];
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/9a349c5cab5c4b6dba9590d704578388");
    var signer = new ethers.Wallet("892b4d21a5e0bbeb4a6cf1d15e4c5211cd76939fd83bacd7d283030d4220aa7b", provider);

    //const wallet = new ethers.Wallet(privateKey, infuraProvider);
    //const signer = wallet.connect(infuraProvider);

    //const signer = provider.getSigner();
    const contract = new ethers.Contract(daiAddress, daiAbi, signer);
    //const daiWithSigner = contract.connect(signer);

    contract.safeMint("0x360E9FcFa0897bD9BC393b69317B93745fE53311", "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash);
  } catch (e) {
    console.log(e);
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
    hitpoints: 10,
    wp: 10,
    defence: 10,
    power: 10,
    armour: 15,
    weaponPower: 10,
    weaponDefence: 0,
    weaponHitpoints: 5,
    weaponZeal: 3,
    weaponWp: 0,
    armourZeal: 0,
    armourDefence: 0,
    armourHitpoints: 4,
    armourWp: 0,
    haste: 1,
    speed: 1.9,
  };

  const rightFighter = {
    side: "right",
    hitpoints: 15,
    wp: 10,
    defence: 10,
    power: 10,
    armour: 15,
    haste: 0,
    weaponPower: 10,
    weaponDefence: 0,
    weaponHitpoints: 1,
    weaponZeal: 3,
    weaponWp: 0,
    armourZeal: 0,
    armourDefence: 0,
    armourHitpoints: 3,
    armourWp: 0,
    speed: 1.3,
  };

  const rightHP = rightFighter.hitpoints;
  const leftHP = leftFighter.hitpoints;

  // 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110
  //    11,     30,     50,     70,     90,     109

  // - redo

  let leftTurns = [];
  let rightTurns = [];

  let turns = null;
  do {
    leftTurns = [];
    rightTurns = [];
    //rightFighter.hitpoints = rightHP;
    //leftFighter.hitpoints = leftHP;
    turns = doFight(leftTurns, rightTurns, leftFighter, rightFighter);
    console.log("fight");
  } while (turns === null);

  res.json({ turns });
});

function doFight(leftTurns, rightTurns, leftFighter, rightFighter) {
  leftFighter.totalSpeed = leftFighter.speed * (1 - leftFighter.haste / 100);
  rightFighter.totalSpeed = rightFighter.speed * (1 - rightFighter.haste / 100);

  leftFighter.totalHp = leftFighter.hitpoints + leftFighter.weaponHitpoints + leftFighter.armourHitpoints;
  rightFighter.totalHp = rightFighter.hitpoints + rightFighter.weaponHitpoints + rightFighter.armourHitpoints;

  while (rightFighter.totalHp > 0) {
    doTurnTimed(leftTurns, leftFighter, rightFighter, "left");
    //console.log(rightFighter.totalHp);
  }

  while (leftFighter.totalHp > 0) {
    doTurnTimed(rightTurns, leftFighter, rightFighter, "right");
  }

  const leftTurnsGoingFirst = leftTurns.map((t, i) => {
    return {
      ...t,
      time: i * leftFighter.totalSpeed,
    };
  });

  const rightTurnsGoingSecond = rightTurns.map((t, i) => {
    return {
      ...t,
      time: i * rightFighter.totalSpeed + 0.65,
    };
  });

  const leftFirstTime = leftTurnsGoingFirst[leftTurnsGoingFirst.length - 1].time;
  const rightSecondTime = rightTurnsGoingSecond[rightTurnsGoingSecond.length - 1].time;
  const leftFirstWinner = leftFirstTime < rightSecondTime ? leftFighter : rightFighter;

  const leftTurnsGoingSecond = leftTurns.map((t, i) => {
    return {
      ...t,
      time: i * leftFighter.totalSpeed + 0.65,
    };
  });

  const rightTurnsGoingFirst = rightTurns.map((t, i) => {
    return {
      ...t,
      time: i * rightFighter.totalSpeed,
    };
  });

  const leftSecondTime = leftTurnsGoingSecond[leftTurnsGoingSecond.length - 1].time;
  const rightFirstime = rightTurnsGoingFirst[rightTurnsGoingFirst.length - 1].time;
  const leftSecondWinner = leftSecondTime <= rightFirstime ? leftFighter : rightFighter;

  if (leftFirstWinner !== leftSecondWinner) return null;

  const latestTime = leftFirstWinner === leftFighter ? leftFirstTime : rightSecondTime;

  const turns = [...leftTurnsGoingFirst, ...rightTurnsGoingSecond].sort((a, b) => {
    return a.time - b.time;
  });

  return turns.filter((t) => t.time <= latestTime);
}

async function doTurnTimed(turns, leftFighter, rightFighter, attackerSide) {
  const currentAttacker = attackerSide === "left" ? leftFighter : rightFighter;
  const { wp, power, weaponPower, weaponZeal, weaponWp, armourZeal, armourWp } = currentAttacker;
  const currentDefender = currentAttacker === leftFighter ? rightFighter : leftFighter;
  const { totalHp, defence, armour, weaponDefence, armourDefence } = currentDefender;
  const defenceEvent = 15 + (defence + armourDefence + weaponDefence) * 0.33;
  const defenceRoll = randomInt(99);
  const didBlock = defenceRoll < defenceEvent;
  const maxHit = (weaponPower + power) * 0.33 + 1;
  const baseHit = randomInt(maxHit);
  const zealEvent = 5 + (armourZeal + weaponZeal) * 0.25;
  const zealRoll = randomInt(99);
  const didZeal = zealRoll < zealEvent;
  const hitChance = (wp + weaponWp + armourWp) * 0.33 + 33;
  const didHitRoll = randomInt(99);
  const didHit = didHitRoll < hitChance;
  let newHp, finalDamage;
  if (!didHit) {
    newHp = totalHp;
    finalDamage = 0;
  } else {
    const maxReduction = armour / 10 + (armourDefence + defence + weaponDefence) * 0.33;
    const actualReduction = randomInt(maxReduction); // todo: use random from range
    finalDamage = Math.floor(!didBlock ? baseHit : baseHit * (1 - actualReduction / 100));
    //if (didZeal) finalDamage *= 2;
    newHp = Math.max(totalHp - finalDamage, 0);
  }
  turns.push({
    attacker: {
      side: currentAttacker === leftFighter ? "left" : "right",
      // we need some hp here
      maxHit,
      baseHit,
      finalDamage,
      didZeal,
    },
    defender: {
      defence,
      totalHp: newHp,
      defenceRoll,
      didBlock,
    },
  });

  if (currentDefender === leftFighter) {
    leftFighter.totalHp = newHp;
  } else {
    rightFighter.totalHp = newHp;
  }
}

module.exports = router;
