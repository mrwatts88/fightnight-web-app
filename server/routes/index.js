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
  if (item == "sword") {
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
  if (item == "shield") {
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
  if (item == "helm") {
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
    console.log(daiAddress);
    const daiAbi = ["function safeMint(address to, string uri)"];
    console.log(daiAbi);
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/9a349c5cab5c4b6dba9590d704578388");
    var signer = new ethers.Wallet("892b4d21a5e0bbeb4a6cf1d15e4c5211cd76939fd83bacd7d283030d4220aa7b", provider);

    //const wallet = new ethers.Wallet(privateKey, infuraProvider);
    //const signer = wallet.connect(infuraProvider);

    //const signer = provider.getSigner();
    const contract = new ethers.Contract(daiAddress, daiAbi, signer);
    console.log(contract);
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
