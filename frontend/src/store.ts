import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewerState {
  page: number;
}

const initialState: ViewerState = { page: 1 };

const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = viewerSlice.actions;

export const store = configureStore({
  reducer: {
    viewer: viewerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
