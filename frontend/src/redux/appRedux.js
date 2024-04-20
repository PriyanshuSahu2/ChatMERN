import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "AppUI",
  initialState: {
    currChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentChat(state, action) {
      state.loading = false;
      state.currChat = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCurrentChat, setLoading, setError } = appSlice.actions;
export default appSlice.reducer;
