import Card from "../card";
import Player from "../player";

let player;

beforeEach(() => {
  player = new Player("bob");
});

describe("Player class", () => {
  test("should have a name property of value passed into constructor", () => {
    expect(player.name).toBe("bob");
  });

  test("stand method should set isStood to true", () => {
    player.stand();

    expect(player.isStood).toBe(true);
  });

  describe("isPlayerFinished method", () => {
    test("should return false if no endgame condition is true", () => {
      expect(player.isPlayerFinished()).toBe(false);
    });

    test("should return true if players isStood property is true", () => {
      player.stand();

      expect(player.isPlayerFinished()).toBe(true);
    });

    test("should return true if players hand isBust property is true", () => {
      player.hand.addCard(new Card("♣", "K"));
      player.hand.addCard(new Card("♠", "K"));
      player.hand.addCard(new Card("♥", "K"));
      player.hand.evaluateScore();

      expect(player.isPlayerFinished()).toBe(true);
    });

    test("should return true if players hand score is 21", () => {
      player.hand.addCard(new Card("♣", "K"));
      player.hand.addCard(new Card("♠", "K"));
      player.hand.addCard(new Card("♥", "A"));
      player.hand.evaluateScore();

      expect(player.isPlayerFinished()).toBe(true);
    });
  });
});
