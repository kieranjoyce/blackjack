import { jest } from "@jest/globals";

import SimulatedPlayer from "../simulatedPlayer.js";
import Player from "../player.js";
import Card from "../card.js";

let simPlayer;

beforeEach(() => {
  simPlayer = new SimulatedPlayer("Simone");
});

describe("SimulatedPlayer class", () => {
  test("should extend Player class", () => {
    expect(simPlayer instanceof Player).toBe(true);
  });

  test("should initialise with name value of first constructor argument preceded by bot", () => {
    expect(simPlayer.name).toBe("Bot Simone");
  });

  describe("chooseAction method", () => {
    test("should not stand with a score of less than 17", () => {
      simPlayer.hand.addCard(new Card("♠", "K"));
      simPlayer.hand.addCard(new Card("♣", "6"));
      simPlayer.hand.evaluateScore();

      simPlayer.chooseAction();

      expect(simPlayer.isStood).toBe(false);
    });

    test("should stand with a score of 17 or more", () => {
      simPlayer.hand.addCard(new Card("♠", "K"));
      simPlayer.hand.addCard(new Card("♣", "7"));
      simPlayer.hand.evaluateScore();

      simPlayer.chooseAction();

      expect(simPlayer.isStood).toBe(true);
    });

    test("should not call stand method if isStood already true", () => {
      simPlayer.hand.addCard(new Card("♠", "K"));
      simPlayer.hand.addCard(new Card("♣", "A"));
      simPlayer.hand.evaluateScore();
      simPlayer.stand();

      const standMock = jest.spyOn(simPlayer, "stand");

      simPlayer.chooseAction();

      expect(standMock).not.toHaveBeenCalled();
    });
  });
});
