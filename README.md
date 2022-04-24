### FightNight

x[] Rework fight logic
x[] Protected routes
x[] Auto-connect wallet
[] Integrate character stats into fights
[] Staking contract
[] Check character equipment
[] Check health
[] Check inventory
[] Select opponent and fight
[] Get herbs and heal
x[] create a city config
x[] Make a click target config system
x[] create a click target tool
x[] mobile view
[x] Loot contract (erc-721)
[x] Check stat details
[x] Choose active character
[x] Make city maps
[x] Place character in city when visiting
[x] Click character for stat preview
[x] deploy backend
[x] put world map in game
[x] make cities clickable
[x] Move fight logic to server


Notes
win fight 
server
  - does get loot?
  - determine type of loot
  - determine stats from eligible range
  - programatically upload metadata to ipfs
    - create metadata points to existing image
    - returns url
  - mint nft with url we just got
    - safeMint
