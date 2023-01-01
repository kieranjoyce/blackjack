const { Player } = require("../player");

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

  test("addWin method should add one to wins property", () => {
    player.addWin();

    expect(player.wins).toBe(1);
  });
});
