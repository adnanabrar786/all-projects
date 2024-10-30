import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  id: null,
  email: null,
  key: null,
  isLogin: false,
  given_name: null,
  family_name: null,
  token: null,
  user_count: 0,
  subscription: "",
  // for database
  userImage: "",
  // for preview
  image: "",
  // for upload
  upload_image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.key = action.payload.key;
      state.isLogin = action.payload.isLogin;
      state.given_name = action.payload.given_name;
      state.family_name = action.payload.family_name;
      state.token = action.payload.token;
      state.subscription = action.payload.subscription;
      state.image = action.payload.image;
      state.user_count = action.payload.user_count;
    },

    getProfileImage: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.image = action.payload;
    },

    getProfileUploadImage: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.upload_image = action.payload;
    },
  },
});

export const { setUserDetails, getProfileImage, getProfileUploadImage } =
  userSlice.actions;

export const { reducer: userReducer } = userSlice;
