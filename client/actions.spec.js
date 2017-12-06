import { Deck, Card, type } from "./actions";

const deck = "Test",
  question = "What is a banana?",
  answer = "A fruit.";

describe("action creators", () => {
  it('should create a "create deck" action', () => {
    const action = Deck.create(deck);
    expect(action).toEqual({
      type: type.CREATE_DECK,
      payload: {
        name: deck
      }
    });
  });

  it('should create a "create card" action', () => {
    const action = Card.create(deck, question, answer);
    expect(action).toEqual({
      type: type.CREATE_CARD,
      payload: {
        deck,
        question,
        answer
      }
    });
  });
});
