import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from '../models/movie.model';

export const moviesApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        movies: builder.query({
            query: () => '/movies',
            providesTags: (result: any, error, arg) =>
                result
                    ? [
                        ...result.map(({ id }: any) => ({ type: "Movie", id })),
                        "Movie",
                    ]
                    : ["Movie"],
        }),
        movie: builder.query({
            query: (id) => `/movies/${id}`,
            providesTags: ['Movie']
        }),
        addMovie: builder.mutation<void, Movie>({
            query: ({ id, name, description, image, imdb, players }) => ({
                url: '/movies',
                method: 'POST',
                body: {
                    id,
                    name,
                    description,
                    image,
                    players,
                    imdb
                }
            }),
            invalidatesTags: ['Movie']
        }),
        updateMovie: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/movies/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Movie']
        }),
        deleteMovie: builder.mutation<void, string>({
            query: (id) => ({
                url: `/movies/${id}`,
                method: 'DELETE'
            })
        })
    })
})



