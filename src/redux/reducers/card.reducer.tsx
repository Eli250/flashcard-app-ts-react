import { createSlice } from "@reduxjs/toolkit";

export interface IFlashcardType {
  id: number;
  question: string;
  answer: string;
  details: string;
  isDone: boolean;
  image: string;
  cardOwner: {
    name: string;
  };
}
export interface IFlashcardState {
  data: { allFlashcards: [IFlashcardType] } | null;
  error: string | null;
  loadingGet: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  loadingRead: boolean;
}

const initialState: IFlashcardState = {
  error: null,
  data: null,
  loadingGet: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  loadingRead: false,
};

export const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    getAllCards: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: IFlashcardState["data"] }
    ): IFlashcardState => {
      return { ...state, loadingGet: false, error: null, data: payload };
    },
    loadingGetAllCards: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: object }
    ): IFlashcardState => {
      return { ...state, loadingGet: true };
    },
    createFlashcard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: IFlashcardType }
    ): IFlashcardState => {
      return {
        ...state,
        loadingCreate: false,
        error: null,
        data: {
          ...state.data,
          allFlashcards: [...state.data!.allFlashcards, payload] as unknown as [
            IFlashcardType
          ],
        },
      };
    },
    loadingCreateCard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: object }
    ): IFlashcardState => {
      return { ...state, loadingCreate: true };
    },
    updateFlashcard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: IFlashcardType }
    ): IFlashcardState => {
      return {
        ...state,
        loadingUpdate: false,
        error: null,
        data: {
          ...state.data!,
          allFlashcards: state.data!.allFlashcards.map((card) => {
            if (card.id === (payload as { id: number }).id) {
              return payload;
            }
            return card;
          }) as [IFlashcardType],
        },
      };
    },
    loadingUpdateCard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: object }
    ): IFlashcardState => {
      return { ...state, loadingUpdate: true };
    },
    deleteFlashcard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: number }
    ): IFlashcardState => {
      return {
        ...state,
        loadingDelete: false,
        error: null,
        data: {
          ...state.data!,
          allFlashcards: state.data!.allFlashcards.filter(
            (card) => card.id !== payload
          ) as [IFlashcardType],
        },
      };
    },
    loadingDeleteCard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: object }
    ): IFlashcardState => {
      return { ...state, loadingDelete: true };
    },
    readFlashcard: (
      state: IFlashcardState,
      {
        type,
        payload,
      }: {
        type: string;
        payload: { id: number };
      }
    ): IFlashcardState => {
      return {
        ...state,
        loadingRead: false,
        error: null,
        data: {
          ...state.data!,
          allFlashcards: state.data!.allFlashcards.map((card) => {
            if (card.id === payload.id) {
              return { ...card };
            }
            return card;
          }) as [IFlashcardType],
        },
      };
    },
    loadingReadCard: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: object }
    ): IFlashcardState => {
      return { ...state, loadingRead: true };
    },
    flashcardError: (
      state: IFlashcardState,
      { type, payload }: { type: string; payload: string }
    ): IFlashcardState => {
      return {
        ...state,
        loadingGet: false,
        loadingCreate: false,
        loadingUpdate: false,
        loadingRead: false,
        error: payload,
      };
    },
  },
});

export const {
  getAllCards: getAllCardsAction,
  loadingGetAllCards: loadingGetAllCardsAction,
  flashcardError: flashcardErrorAction,
  createFlashcard: createFlashcardAction,
  loadingCreateCard: loadingCreateCardAction,
  updateFlashcard: updateFlashcardAction,
  loadingUpdateCard: loadingUpdateCardAction,
  deleteFlashcard: deleteFlashcardAction,
  loadingDeleteCard: loadingDeleteCardAction,
  readFlashcard: readFlashcardAction,
  loadingReadCard: loadingReadCardAction,
} = flashcardSlice.actions;
export const flashcardReducer = flashcardSlice.reducer;
