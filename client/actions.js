export const type = {
  CREATE_DECK: "create deck",
  CREATE_CARD: "create card"
};

export const Deck = {
  create: (name: string) => ({
    type: type.CREATE_DECK,
    payload: {
      name
    }
  })
};

export const Card = {
  create: (deck: string, question: string, answer: string) => ({
    type: type.CREATE_CARD,
    payload: {
      deck,
      question,
      answer
    }
  })
};
