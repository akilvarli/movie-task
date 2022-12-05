import { useNavigate, useParams } from 'react-router-dom';
import { Theme, Grid, TextField } from '@mui/material';
import { moviesApi } from '../../services/baseMovieApi';
import { createStyles, makeStyles } from '@mui/styles';
import { FC, useState, useEffect } from 'react';

const useUpdateMovieMutation = moviesApi.endpoints.updateMovie.useMutation
const useGetMoviesQuery = moviesApi.endpoints.movies.useQuery
const useGetMovieQuery = moviesApi.endpoints.movie.useQuery


type FormUpdateProps = {
  singleMovie?: any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        display: 'flex',
        width: '100%',
        margin: theme.spacing(1),
        flexDirection: 'column',
      }
    },
    pageContent: {
      margin: "10% auto",
      padding: theme.spacing(2),
      width: "100%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: "100vh",
    }
  }),
);

const FormUpdate: FC<FormUpdateProps> = (props) => {

  const { singleMovie } = props;
  const params: any = useParams()

  const movieId = params.id.toString()

  const classes = useStyles();
  const navigate = useNavigate()
  const [updateMovie, { isLoading }] = useUpdateMovieMutation()
  const { isLoading: isMovieLoading, isSuccess, refetch } = useGetMovieQuery(movieId, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });


  const [name, setName] = useState("")
  const [image, setImage] = useState("");
  const [imdb, setImdb] = useState("");
  const [players, setPlayers] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName(singleMovie.name)
      setImage(singleMovie.image)
      setPlayers(singleMovie.players)
      setImdb(singleMovie.imdb)
      setDescription(singleMovie.description)
    }
  }, [isSuccess, singleMovie?.name, singleMovie?.image, singleMovie?.players, singleMovie?.imdb, singleMovie?.description])

  if (isLoading) return <p>Loading...</p>

  if (!singleMovie) {
    return (
      <section>
        <h2>Movie not found</h2>
      </section>
    )
  }

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onPlayersChanged = (e: React.ChangeEvent<HTMLInputElement>) => setPlayers(e.target.value)
  const onImdbChanged = (e: React.ChangeEvent<HTMLInputElement>) => setImdb(e.target.value)
  const onImageChanged = (e: any) => setImage(URL.createObjectURL(e.target.files[0]))
  const onDescriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)


  const canSave = [name, image, imdb, players, description].every(Boolean) && !isLoading;

  const onSaveMovieClicked = async () => {

    if (canSave) {
      try {
        await updateMovie({ id: movieId, name, players, image, description, imdb }).unwrap()
        setName('')
        setPlayers('')
        setImage('')
        setImdb('')
        setDescription('')
        navigate(`/movieList`)
      } catch (err) {
        console.log('Failed to save the movie', err)
      }
    }
    refetch();
    navigate('/movieList')
  }



  return (

    <form className={classes.root} >
      <Grid container>
        <Grid item xs={4}>
          <TextField
            required
            variant='outlined'
            label="Full Name"
            onChange={onNameChanged}
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
            value={imdb}
            onChange={onImdbChanged}
            label="IMDB Puanı"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            variant='outlined'
            value={players}
            onChange={onPlayersChanged}
            label="Oyuncular"
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
            value={undefined}
            onChange={onImageChanged}
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
            value={description}
            onChange={onDescriptionChanged}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
      <button
        style={{ margin: '0 auto', width: "20%", height: '50px' }}
        type='button' onClick={onSaveMovieClicked}>
        Filmi Düzenle
      </button>
      <button
        style={{ margin: '0 30px', width: "20%", height: '50px' }}
        type='button' onClick={() => navigate(-1)}>
        Geri
      </button>
    </form>
  )
}

export default FormUpdate