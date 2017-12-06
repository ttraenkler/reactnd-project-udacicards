import { createStore } from "redux";
import { reducer } from "./reducer";
import { Deck, Card, type } from "./actions";
import data from "../data.json";

const deck = "Test",
  question = "What is a banana?",
  answer = "A fruit.";

describe("reducer", () => {
  const store = createStore(reducer);

  it("should init the state", () => {
    const state = store.getState();
    expect(state).toEqual(data);
  });

  it('should reduce a "create deck" action', () => {
    const action = Deck.create(deck);
    store.dispatch(action);
    const state = store.getState();
    expect(state).toEqual({
      ...data,
      Test: { questions: [], title: "Test" }
    });
  });

  it('should reduce a "create card" action', () => {
    const action = Card.create(deck, question, answer);
    store.dispatch(action);
    const state = store.getState();
    expect(JSON.stringify(state, null, 2)).toEqual(
      JSON.stringify(
        {
          ...data,
          Test: { title: "Test", questions: [{ question, answer }] }
        },
        null,
        2
      )
    );
  });
});
