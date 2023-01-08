# Blackjack

A game of blackjack that is playable in the terminal, dealing the user an opening hand, displaying the hand to the user, allowing the user to choose to hit or stand, and displaying the results to the user when the game is over. The user can also choose to include the desired amount of simulated players that use a standard strategy to compete against for the highest score (that doesn't go bust). 

## Technologies used
The project is built in JavaScript using an Object-oriented approach and runs in Node.js. Unit testing is performed using the Jest framework.
Other packages used:
- Inquirer:  taking user input in the terminal
- Figlet: creating ASCII art from text
- chalk: terminal string styling
- unique-names-generator: generate names for simulated players

## Prerequisites

This project requires Node.js, at least `v18.0.0`, and npm, at least `8.0.0`

## Installation
To install blackjack, follow these steps:
1. Clone the repository to your local machine and navigate inside it
```
git clone https://github.com/kieranjoyce/blackjack.git && cd blackjack
```
2. Install dependencies 
```
npm install
```

## Playing blackjack

### Starting a game

The program can be started by running either of these commands in the terminal window you would like to play in.

```
node .
```

or

```
node ./index.js
```

### Controls

The player can interact with the game through inputting text or using the up/down arrows to select desired option from a list (depending on the current prompt)

- ⬆ up/ ⬇ down arrow keys: move between options in a list
- Enter key: select currently highlighted option in a list or current text in an input field
