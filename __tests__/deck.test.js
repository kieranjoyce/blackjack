import Deck from "../deck";
import Card from "../card";

let deck;

beforeEach(() => {
  deck = new Deck();
});

describe("Deck class", () => {
  const validSuits = /[♥♦♠♣]/;
  const validValues = /[A23456789(10)JQK]/;

  test("deck is initialised with 52 cards", () => {
    expect(deck.cards).toHaveLength(52);
    for (let card of deck.cards) {
      expect(card).toBeInstanceOf(Card);
    }
  });

  test("deck contains only standard cards", () => {
    for (let card of deck.cards) {
      expect(card.suit).toMatch(validSuits);
      expect(card.value).toMatch(validValues);
    }
  });

  test("deck contains no duplicates", () => {
    let includedCards = [];
    for (let card of deck.cards) {
      let cardName = card.value + card.suit;
      let isCardDuplicate = includedCards.includes(cardName);
      expect(isCardDuplicate).toBe(false);
      if (!isCardDuplicate) {
        includedCards.push(cardName);
      }
    }
  });

  test("takeCard method removes a random card from cards array and returns it", () => {
    let removedCard = deck.takeCard();

    // tests whether card removed
    expect(deck.cards.length).toBe(51);

    // tests whether card returned
    expect(removedCard).toMatchObject({
      suit: expect.stringMatching(validSuits),
      value: expect.stringMatching(validValues),
    });

    // tests that returned card is the same as removed card
    let containsSameCard = false;
    for (let card of deck.cards) {
      if (card.suit === removedCard.suit && card.value === removedCard.value) {
        containsSameCard = true;
      }
    }

    expect(containsSameCard).toBe(false);
  });
});
