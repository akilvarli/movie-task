import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../features/movies/movieSlice';
import { moviesApi } from "../services/baseMovieApi";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        [moviesApi.reducerPath]: moviesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>