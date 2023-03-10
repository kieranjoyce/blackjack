import Dealer from "../dealer";
import Deck from "../deck";
import Hand from "../hand";
import Card from "../card";
import { jest } from "@jest/globals";

let dealer;
let deck;
let playersHand;

beforeEach(() => {
  dealer = new Dealer();
  playersHand = new Hand();
});

describe("Dealer class", () => {
  describe("dealCard method", () => {
    test("should remove a card from dealer's deck and add one to the given hand", () => {
      dealer.dealCard(playersHand);

      expect(dealer.deck.cards.length).toBe(51);
      expect(playersHand.cards.length).toBe(1);

      let dealtCard = playersHand.cards[0];

      expect(dealtCard instanceof Card).toBe(true);
    });

    test("card added to the hand and removed from the deck should be the same", () => {
      let takeCardMock = jest.spyOn(dealer.deck, "takeCard");

      dealer.dealCard(playersHand);
      let dealtCard = playersHand.cards[0];

      expect(takeCardMock).toHaveReturnedWith(dealtCard);
    });

    test("should call hands evaluateScore method after card dealt", () => {
      let evaluateScoreSpy = jest.spyOn(playersHand, "evaluateScore");

      dealer.dealCard(playersHand);

      expect(evaluateScoreSpy).toHaveBeenCalled();
      expect(playersHand.score).not.toBe(0);
    });
  });
});
