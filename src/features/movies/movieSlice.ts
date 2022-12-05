import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API
import movieApi from "../../apis/movieApi";
import { APIKEY } from "../../apis/movieApiKey";


interface MovieState {
    loading: boolean,
    error: null | string,
    data: null | { results: any[] },
    Search: null | { results: any[]; },
    movieDetails: null | any,
}



const initialState: MovieState = {
    loading: false,
    error: null,
    data: null,
    Search: null,
    movieDetails: null,
}


// Action
export const getMovies = createAsyncThunk("movies/getMovies",
    async (searchTerm: string, thunkApi) => {
        try {
            const response = await movieApi.get(`?apiKey=${APIKEY}&s=${searchTerm}&type=movie`);

            return await response.data;

        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    });

// get move details
export const getMovieDetails = createAsyncThunk(
    "movies/getMovieDetails",
    async (imdbID: string | any, thunkApi) => {

        try {
            const response = await movieApi.get(
                `?apiKey=${APIKEY}&i=${imdbID}&Plot=full`
            );
            return await response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);



// Slice
const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMovies.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.data = action.payload;
            });
        builder.addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload
        }),
            builder.addCase(getMovieDetails.pending, (state) => {
                state.loading = true;
            });
        builder.addCase(getMovieDetails.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.movieDetails = action.payload;
        });
        builder.addCase(getMovieDetails.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const getSelectedMovie = (state: any) => state.movies.movieDetails;
export default movieSlice.reducer;