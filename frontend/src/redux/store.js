import { configureStore } from "@reduxjs/toolkit";
import userRedux from "./userRedux";
import appRedux from "./appRedux";

export const store = configureStore({
  reducer: { user: userRedux, appUI: appRedux },
});
