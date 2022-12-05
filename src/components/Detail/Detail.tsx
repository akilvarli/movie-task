import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails, getSelectedMovie } from "../../features/movies/movieSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import './Detail.scss';

// MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CakeIcon from '@mui/icons-material/Cake';


const Detail = () => {

    const { imdbID } = useParams();
    const dataMovie = useSelector(getSelectedMovie);

    console.log(dataMovie)
    const dispatch: any = useAppDispatch();

    useLayoutEffect(() => {
        dispatch(getMovieDetails(imdbID));
    }, [dispatch, imdbID]);

    // if not found movieDetails
    if (!dataMovie) {
        return <h1>Movie Not Found</h1>;
    }

    return (
        <Card sx={{ maxWidth: 1000, minWidth: 400, display: 'flex' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" marginBottom={4}>
                    {dataMovie.Title}
                </Typography>
                <Box className="movie-rating">
                    <Typography variant="body2" color="text.secondary" marginBottom={2} display="flex" alignItems="center" justifyContent="space-between">
                        <span>IMDB Ratings: <StarIcon />: {dataMovie.imdbRating}</span>
                        <span>IMDB Votes: <ThumbUpIcon />: {dataMovie.imdbVotes}</span>
                        <span>Runtime: <LocalMoviesIcon />: {dataMovie.Runtime}</span>
                        <span>Year: <CakeIcon />: {dataMovie.Year}</span>
                    </Typography>
                </Box>
                <Box marginBottom={2} className="movie-plot">{dataMovie.Plot}</Box>
                <Box className="movie-info">
                    <div>
                        <span style={{ fontWeight: "bold" }}>Director: </span>
                        <span>{dataMovie.Director}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Released: </span>
                        <span>{dataMovie.Released}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Generes: </span>
                        <span>{dataMovie.Genre}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Languages: </span>
                        <span>{dataMovie.Language}</span>
                    </div>
                    <div>
                        <span style={{ fontWeight: "bold" }}>Awards: </span>
                        <span>{dataMovie.Awards}</span>
                    </div>
                </Box>
            </CardContent>
            <CardMedia
                component="img"
                height="450"
                image={dataMovie.Poster}
                alt="Movie Poster"
            />
        </Card>
    )
};

export default Detail;

