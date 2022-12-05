import { moviesApi } from "../../services/baseMovieApi";

// Material
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton } from "@mui/material";
import { Delete, Settings } from "@mui/icons-material";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const useGetMoviesQuery = moviesApi.endpoints.movies.useQuery
const useMovieQuery = moviesApi.endpoints.movie.useQuery
const useDeleteMovieMutation = moviesApi.endpoints.deleteMovie.useMutation


type MovieData = {
  id: string | any,
  data: [],
  error: string | any,
  isLoading: boolean,
  isSuccess: boolean,
  isFetching: boolean
}

const MovieList = () => {

  const { data, error, isLoading, isFetching, isSuccess } = useGetMoviesQuery<MovieData>();

  const navigate = useNavigate()

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>  <h1>React Redux Toolkit RTK Query Go</h1>
        <Button sx={{ marginLeft: '20px', height: '40px' }} onClick={() => navigate('/')}>Go Home</Button>
      </Box>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div style={{ marginBottom: "20px", marginLeft: "10px", display: "flex", gap: "20px" }}>
          {data.map((movie: any) => {
            return (
              <Card key={movie.id} sx={{ maxWidth: 500, minWidth: 200, display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  width="100%"
                  height="100%"
                  image={movie?.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body1" color="text.primary">
                    {movie.name}
                  </Typography>
                  <Typography paragraph sx={{ fontSize: "12px" }}>{movie.description}
                  </Typography>
                </CardContent>
                <MovieDetail id={movie.id} />
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const MovieDetail = ({ id }: any) => {


  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { refetch } = useGetMoviesQuery();
  const dataDetail: any = useMovieQuery(id)
  const [deleteMovie] = useDeleteMovieMutation() || {};


  const handleDelete = (id: any) => {
    deleteMovie(id)
    refetch();
    setOpen(false)
  }

  const movieDetail = dataDetail?.currentData
  return (
    <CardContent>
      <Typography variant="body1" color="text.primary">
        IMDB: {movieDetail?.imdb}
      </Typography>
      <Link to={`${id}`}><IconButton color="warning"><Settings />Düzenle</IconButton></Link>
      <IconButton onClick={handleClickOpen} color="error"><Delete />Sil</IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Filmi silmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(id)} color="error" autoFocus>
            Evet
          </Button>
          <Button color="secondary" onClick={handleClose} autoFocus>
            Hayır
          </Button>
        </DialogActions>
      </Dialog>
    </CardContent>

  )
}


export default MovieList