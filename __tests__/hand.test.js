const { Hand } = require("../hand");
const { Card } = require("../card");

let hand;

beforeEach(() => {
  hand = new Hand();
});

describe("Hand class", () => {
  test("should be initialised correct starting values", () => {
    expect(hand.cards.length).toBe(0);
    expect(hand.score).toBe(0);
    expect(hand.isBust).toBe(false);
  });

  test("addCard method should add provided card to cards array", () => {
    hand.addCard(new Card("♥", "Q"));
    expect(hand.cards[0]).toMatchObject({
      suit: "♥",
      value: "Q",
    });
  });

  describe("evaluateScore method", () => {
    test("should set score property to card value when hand contains single number card", () => {
      hand.addCard(new Card("♥", "5"));
      hand.evaluateScore();

      expect(hand.score).toBe(5);
    });

    test("should evaluate the score of a single picture card (jack, queen or king) as 10", () => {
      hand.addCard(new Card("♣", "K"));
      hand.evaluateScore();

      expect(hand.score).toBe(10);
    });

    test("should find sum of card values when hand contains multiple cards (excluding aces)", () => {
      hand.addCard(new Card("♦", "8"));
      hand.addCard(new Card("♣", "3"));
      hand.addCard(new Card("♠", "J"));

      hand.evaluateScore();
      expect(hand.score).toBe(21);
    });

    test("should evaluate the score of a single ace as 11", () => {
      hand.addCard(new Card("♠", "A"));

      hand.evaluateScore();
      expect(hand.score).toBe(11);
    });

    test("should evaluate the score of an ace that would lead to a bust score as 1", () => {
      hand.addCard(new Card("♠", "K"));
      hand.addCard(new Card("♣", "Q"));
      hand.addCard(new Card("♥", "A"));

      hand.evaluateScore();
      expect(hand.score).toBe(21);
    });
  });
});
