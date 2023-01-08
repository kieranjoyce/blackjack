import Game from "../game.js";
import Dealer from "../dealer.js";
import Player from "../player.js";
import SimulatedPlayer from "../simulatedPlayer.js";
import { jest } from "@jest/globals";

function mockIsPlayerFinished(player, value) {
  player.isPlayerFinished = jest.fn().mockReturnValue(value);
}

describe("Game class", () => {
  describe("should be initialised with appropriate properties", () => {
    let game = new Game("me", 2);

    test("should have dealer property of a Dealer object by default", () => {
      expect(game.dealer).toBeInstanceOf(Dealer);
    });

    test("should have isGameOver property of false by default", () => {
      expect(game.isGameOver).toBe(false);
    });

    test("should have mainPlayer property of a Player object with name given in first argument ", () => {
      expect(game.mainPlayer).toBeInstanceOf(Player);
      expect(game.mainPlayer.name).toBe("me");
    });

    test("should have simulatedPlayers property which is an array of simulatedPlayers of length given in second argument", () => {
      expect(game.simulatedPlayers).toHaveLength(2);

      for (let player of game.simulatedPlayers) {
        expect(player).toBeInstanceOf(SimulatedPlayer);
      }
    });

    test("should deal opening hand to all players", () => {
      expect(game.mainPlayer.hand.cards).toHaveLength(2);

      for (let player of game.simulatedPlayers) {
        expect(player.hand.cards).toHaveLength(2);
      }
    });
  });

  describe("playSimulatedPlayersRound method", () => {
    test("should call the chooseAction method of simulated players that are not finished playing", () => {
      let game = new Game("Steve", 1);

      let unfinishedPlayer = game.simulatedPlayers[0];
      mockIsPlayerFinished(unfinishedPlayer, false);

      let chooseActionSpy = jest.spyOn(
        game.simulatedPlayers[0],
        "chooseAction"
      );

      game.playSimulatedPlayersRound();

      expect(chooseActionSpy).toHaveBeenCalled();
    });

    test("should not call the chooseAction method of simulated player that is finished playing", () => {
      let game = new Game("Steve", 1);

      let finishedPlayer = game.simulatedPlayers[0];
      mockIsPlayerFinished(finishedPlayer, true);

      let chooseActionSpy = jest.spyOn(finishedPlayer, "chooseAction");

      game.playSimulatedPlayersRound();

      expect(chooseActionSpy).not.toHaveBeenCalled();
    });

    test("should deal a card to simulated player if they are not finished and do not choose to stand", () => {
      let game = new Game("Steve", 1);

      let playerThatHits = game.simulatedPlayers[0];
      // mocking isPlayerFinished so that player is guaranteed to not finished (getting a blackjack in opening hand would lead to instant finish)
      mockIsPlayerFinished(playerThatHits, false);
      // mocking chooseAction so that player does not stand
      playerThatHits.chooseAction = jest.fn();

      game.playSimulatedPlayersRound();

      expect(playerThatHits.hand.cards).toHaveLength(3);
    });

    test("should not deal a card to simulated player if they choose to stand", () => {
      let game = new Game("Steve", 1);

      let playerThatStands = game.simulatedPlayers[0];
      mockIsPlayerFinished(playerThatStands, false);
      // mocking chooseAction so that always makes player stand
      playerThatStands.chooseAction = jest.fn(() => {
        playerThatStands.stand();
      });

      game.playSimulatedPlayersRound();

      expect(playerThatStands.hand.cards).toHaveLength(2);
    });
  });

  test("should maintain above behaviour for multiple simulated players", () => {
    let game = new Game("Steve", 3);

    let playerThatHits = game.simulatedPlayers[0];
    playerThatHits.chooseAction = jest.fn();
    mockIsPlayerFinished(playerThatHits, false);

    let playerThatStands = game.simulatedPlayers[1];
    playerThatStands.chooseAction = jest.fn(() => {
      playerThatStands.stand();
    });
    mockIsPlayerFinished(playerThatStands, false);

    let finishedPlayer = game.simulatedPlayers[2];
    mockIsPlayerFinished(finishedPlayer, true);

    let chooseActionSpy = jest.spyOn(finishedPlayer, "chooseAction");

    game.playSimulatedPlayersRound();

    expect(playerThatHits.hand.cards).toHaveLength(3);
    expect(playerThatStands.hand.cards).toHaveLength(2);
    expect(chooseActionSpy).not.toHaveBeenCalled();
  });

  describe("playMainPlayerRound method", () => {
    let game;

    beforeEach(() => {
      game = new Game("Bob", 0);
    });

    test("should deal a card to main players hand if called with first argument of 'hit' and main player is not finished", () => {
      mockIsPlayerFinished(game.mainPlayer, false);

      let dealCardSpy = jest.spyOn(game.dealer, "dealCard");

      game.playMainPlayerRound("hit");

      expect(dealCardSpy).toHaveBeenCalledWith(game.mainPlayer.hand);
      expect(game.mainPlayer.hand.cards).toHaveLength(3);
    });

    test("should not deal a card to main players hand if called with first argument of 'stand' and main player is not finished", () => {
      mockIsPlayerFinished(game.mainPlayer, false);

      let dealCardSpy = jest.spyOn(game.dealer, "dealCard");

      game.playMainPlayerRound("stand");

      expect(dealCardSpy).not.toHaveBeenCalled();
      expect(game.mainPlayer.hand.cards).toHaveLength(2);
    });

    test("should not deal a card to main players hand if main player is finished", () => {
      mockIsPlayerFinished(game.mainPlayer, true);
      let dealCardSpy = jest.spyOn(game.dealer, "dealCard");

      game.playMainPlayerRound("hit");

      expect(dealCardSpy).not.toHaveBeenCalled();
      expect(game.mainPlayer.hand.cards).toHaveLength(2);
    });

    test("should throw error if called without first argument of hit or stand", () => {
      function noArgument() {
        game.playMainPlayerRound();
      }

      function wrongArgument() {
        game.playMainPlayerRound("wrong");
      }

      expect(noArgument).toThrow();
      expect(wrongArgument).toThrow();
    });
  });

  describe("checkGameOver method", () => {
    test("should set isGameOver property to true if mainPlayer is finished in solo game", () => {
      let game = new Game("Jean", 0);

      mockIsPlayerFinished(game.mainPlayer, true);
      game.checkGameOver();

      expect(game.isGameOver).toBe(true);
    });

    test("should not set isGameOver property to true if mainPlayer is finished but not all simulated players are", () => {
      let game = new Game("Jean", 2);

      mockIsPlayerFinished(game.mainPlayer, true);

      let unfinishedPlayer = game.simulatedPlayers[0];
      let finishedPlayer = game.simulatedPlayers[1];
      mockIsPlayerFinished(unfinishedPlayer, false);
      mockIsPlayerFinished(finishedPlayer, true);

      game.checkGameOver();

      expect(game.isGameOver).toBe(false);
    });

    test("should set isGameOver property to true if mainPlayer and all simulated players are finished", () => {
      let game = new Game("Jean", 4);

      mockIsPlayerFinished(game.mainPlayer, true);
      for (let player of game.simulatedPlayers) {
        mockIsPlayerFinished(player, true);
      }

      game.checkGameOver();

      expect(game.isGameOver).toBe(true);
    });
  });

  describe("determineResult method", () => {
    test("should return bust", () => {});
  });
});
