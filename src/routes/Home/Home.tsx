import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// MUI
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Grid from "@mui/material/Grid"
import { Container } from "@mui/system";


// Styles
import './Home.scss';


// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { getMovies } from '../../features/movies/movieSlice';

// Components
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import { Dialog, useMediaQuery, useTheme } from '@mui/material';




const Home = () => {

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { movies } = useAppSelector((state) => state);

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const dispatch: any = useAppDispatch();

    useEffect(() => {
        dispatch(getMovies(searchTerm))
    }, [dispatch, searchTerm])


    const searchMovies = movies.data?.Search?.filter((movie: any) => {
        if (!searchTerm.length) return movie;
        return movie.Title.toLowerCase().includes(searchTerm);
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Container maxWidth="xl">
            <Grid justifyContent="center" className={searchTerm !== "" ? "" : "searchBox"} flexDirection="column">
                {
                    searchTerm === "" && (
                        <ButtonGroup>
                            <Button onClick={handleOpen} className="movieBtn" variant="contained">Film Ekle +</Button>
                            <Link to="/movieList"><Button className="movieBtn" variant="contained">Film Listesi</Button></Link>
                        </ButtonGroup>
                    )
                }
                <SearchBox length={movies.data?.Search?.length} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            </Grid>
            <Dialog open={open} >
                <AddMovieForm handleClose={handleClose}/>
            </Dialog>
            <div className='movieList'>

            {
                searchMovies && searchMovies.map((movie: any) => {
                    const { id, Title, Year, imdbID, Type, Poster } = movie;
                    return (
                        <MovieCard
                            key={id}
                            id={imdbID}
                            Title={Title}
                            Year={Year}
                            imdbID={imdbID}
                            Type={Type}
                            Poster={Poster}
                        />
                    )
                })
            }
            </div>
        </Container>
    )
}

export default Home