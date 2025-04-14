import store from "./store";

type AppDispatch = typeof store.dispatch;

declare global {
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = AppDispatch;
}
