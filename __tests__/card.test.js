const { Card } = require("../card");

describe("Card class", () => {
  test("returns an object with provided suit, name and value properties", () => {
    let card = new Card("hearts", "Q", 10);
    expect(card.suit).toBe("hearts");
    expect(card.name).toBe("Q");
    expect(card.value).toBe(10);
  });
});
