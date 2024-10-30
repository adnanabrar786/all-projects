import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  uploadImage: "",
  isOpen: "",
  appbarId: "",
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setProfileImage: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.uploadImage = action.payload;
    },

    setIsOpen: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.isOpen = action.payload;
    },
    setAppbarId: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.appbarId = action.payload;
    },
  },
});

export const { setProfileImage, setIsOpen, setAppbarId } = imageSlice.actions;

export const { reducer: imageReducer } = imageSlice;
