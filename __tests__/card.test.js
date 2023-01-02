import Card from "../card";

describe("Card class", () => {
  test("returns an object with provided suit and value properties", () => {
    let card = new Card("♥", "Q");
    expect(card.suit).toBe("♥");
    expect(card.value).toBe("Q");
  });
});
