interface IFlashcard {
  data: {
    allFlashcards: {
      id: number;
      question: string;
      answer: string;
      isDone: boolean;
      details: string;
      cardOwner: {
        name: string;
      };
    }[];
  };
}
export const flashcardData: IFlashcard = {
  data: {
    allFlashcards: [
      {
        id: 1,
        question: "What is a flashcard",
        answer: "A card used to remeber data",
        details: "A very smoth way to remember data",
        isDone: false,
        cardOwner: {
          name: "Eli Hirwa",
        },
      },
      {
        id: 2,
        question: "Do you know a card",
        answer: "Yes",
        details: "A very smoth way to remember data",
        isDone: false,
        cardOwner: {
          name: "Eli Hirwa",
        },
      },
      {
        id: 3,
        question: "How does it look?",
        answer: "Bad",
        details: "A very smoth way to remember data",
        isDone: true,
        cardOwner: {
          name: "Eli Hirwa",
        },
      },
    ],
  },
};
