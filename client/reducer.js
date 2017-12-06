import { type } from "./actions";
import data from "../data.json";

export function reducer(state = data, action) {
  const { payload } = action;
  switch (action.type) {
    case type.CREATE_DECK: {
      // TODO: implement
      if (!state[payload.name]) {
        return {
          ...state,
          [payload.name]: {
            title: payload.name,
            questions: []
          }
        };
      }
    }
    case type.CREATE_CARD: {
      const { deck, question, answer } = payload;
      // TODO: implement
      if (state[deck]) {
        return {
          ...state,
          [deck]: {
            ...state[deck],
            questions: [...state[deck].questions, { question, answer }]
          }
        };
      }
    }
    default: {
      return state;
    }
  }
}
