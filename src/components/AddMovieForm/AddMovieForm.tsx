import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme, Grid, TextField, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createStyles, makeStyles } from '@mui/styles';
import { moviesApi } from '../../services/baseMovieApi';
import "./AddMovieForm.scss";

const useAddMovieMutation = moviesApi.endpoints.addMovie.useMutation
const useGetMoviesQuery = moviesApi.endpoints.movies.useQuery


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        width: '100%',
        margin: theme.spacing(1),
      }
    },
    pageContent: {
      margin: "10% auto",
      padding: theme.spacing(6),
      width: "70%",
      minHeight: "40vh"
    }
  }),
);

interface MovieProps {
  handleClose: () => void
}

const AddMovieForm:FC<MovieProps> = ({handleClose}) => {



  const navigate = useNavigate()

  const [addMovie, { isError, isLoading, error }] = useAddMovieMutation();
  const { refetch } = useGetMoviesQuery();

  const classes = useStyles();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [imdb, setImdb] = useState("");
  const [players, setPlayers] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);


  const movieSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const data: any = { name, image, imdb, players, description };

    addMovie(data);
    refetch();

    navigate('/movieList')
  }



  return (
    <Paper className={classes.pageContent} elevation={6} sx={{
      width:"100% !important",
      margin:"unset !important" 
    }}>
        <IconButton
          aria-label="close"
          onClick={() => handleClose()}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      <form className={classes.root} onSubmit={movieSubmitHandler}>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              required
              variant='outlined'
              label="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              variant='outlined'
              label="IMDB Puanı"
              onChange={(e) => setImdb(e.target.value)}
              value={imdb}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              variant='outlined'
              label="Oyuncular"
              onChange={(e) => setPlayers(e.target.value)}
              value={players}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              type="file"
              variant='outlined'
              label="Film Görseli"
              onChange={(e: any) => setImage(URL.createObjectURL(e.target.files[0]))}
              value={undefined}
              name="file"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant='outlined'
              label="Film Kısa Açıklama"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid>
          </Grid>
        </Grid>
        <button type='submit'>Film Ekle</button>
      </form>
    </Paper>
  )
}

export default AddMovieForm