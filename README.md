# ATASCII Delivery
2024 7 Day Roguelike

most of this pasted from text.. need to fix markdown formatting. 

This is a recreation of an 8-bit Atari game that I remember playing as a child.
I do not remember the title or publisher or anything that could help identify the original game.
It was not originally using character graphics or turn-based movement,
And it may not have had concepts of "fuel" or other features implemented here.
But I have made these design choices to cross-breed the memory of this game with roguelike design paradigms.

## Feature Plan

screen change / scene change
- title
- main game
- end

generate city
- buildings
- landing pad
- fuel depot

generate ships
- size
- speed
- colour gradient
- travel lanes

parcel
- animate mothership
- three states
    - parcel waiting for pickup
    - parcel onboard
    - delivered, new parcel ready, difficulty update

juice
- smooth animation of traffic
- UI feedback, current vector
- blink/glow parcel
- landing pad lights
    - fuel gauge
    - animate / bounce arrows pointing to parcel, landing pad, fuel depot
    - animate thrust

stretch:
- simultanious movement
- gravity
- pre-plot thrust then execute
- increase city difficulty
- landing pads with overhangs
- tall towers and canyons

## Day Plan

1
- font package loaded
- scenes configures
    - intro
    - main play
    - outro
stretch:
- generate city
- generate ships

2
- movement
- pickup and deliver parcel
- bump/death
stretch:
- UI 
- fuel
- out of bounds

3
- velocity
- simultanious movement
- gravity

4
- movement planning and vector forecast effects

5
- extra UI FX, landing and fuel notices

6
- additional FX, city lights, ship animations
- ui notifications blink or glow or bounce

7
- tbd

## Like Rogue

- ascii-like character display (atascii text on canvas)
- grid based movement
- character centric
- permadeath / ironman / permanent consequences
- clean slate runs
- random maps
- random actor selection and placement
- bump interactions (destructive)
- pickup quest item from one end of the dungeon and deliver it to the other
- hunger clock -- fuel
- inventory
- turn based
- **sequential turns, if stretch goal not met**
- **forced movement like rogue's traps, if gravity is implemented**

## Unlike Rogue

- no weapons, no ranged combat
- non-random conflict outcomes
- no potions, wands, scrolls
- no interaction with inventory, just bump to take and drop
- no discovery: los, secret doors, traps, unidentified items
- multi-tile actors
- randomly generated actors
- **simultanious turns, if stretch goal met**
- non-modal interface: no modal UI for inventory, ranged targeting, potion interactions, etc
- side view, instead of top-down
- bump to interact:  rogue does not bump to pickup or drop or to interact with environment, this does.