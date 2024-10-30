import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  selectedTypes: {
    message: string;
    type: string;
    topic: string;
    tone: string;
    style: string;
    length: string;
    action: string;
    language: string;
  };
}

const initialState: InitialState = {
  selectedTypes: {
    message: "",
    type: "",
    topic: "",
    tone: "",
    style: "",
    length: "",
    action: "",
    language: "",
  },
};

export const promptSlice = createSlice({
  name: "generatePrompt",
  initialState,
  reducers: {
    setMessage: (
      state: typeof initialState,
      action: PayloadAction<string>,
    ) => {},
    setMessageTypes: (
      state: typeof initialState,
      action: PayloadAction<InitialState>,
    ) => {
      state.selectedTypes = action.payload.selectedTypes;
    },
  },
});

export const { setMessageTypes, setMessage } = promptSlice.actions;

export const { reducer: userPromptReducer } = promptSlice;
