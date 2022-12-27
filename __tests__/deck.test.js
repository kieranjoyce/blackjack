const { Deck } = require("../deck");
const { Card } = require("../card");

let deck;

beforeEach(() => {
  deck = new Deck();
});

describe("Deck class", () => {
  test("deck is initialised with 52 cards", () => {
    expect(deck.cards).toHaveLength(52);
    for (let card of deck.cards) {
      expect(card).toBeInstanceOf(Card);
    }
  });

  test("deck contains only standard cards", () => {
    const validSuits = ["♥", "♦", "♠", "♣"];
    const validValues = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let card of deck.cards) {
      expect(validSuits.includes(card.suit)).toBe(true);
      expect(validValues.includes(card.value)).toBe(true);
    }
  });

  test("removeCard method removes a card from the deck and returns it", () => {});
});
