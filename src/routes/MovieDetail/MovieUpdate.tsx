import { useParams } from 'react-router-dom';
import FormUpdate from '../../components/FormUpdate/FormUpdate';
import { moviesApi } from '../../services/baseMovieApi';

const useGetMovieQuery = moviesApi.endpoints.movie.useQuery

const MovieUpdate = () => {


  const { id }: any = useParams();
  const { data: singleMovie } = useGetMovieQuery(id);


  return (
    <div role="movieupdate" className='container mt-4 mb-4 pd-3'>
      <h1>Düzenlenen Film: {singleMovie?.name}</h1>
      <hr />
      <div>
        <FormUpdate singleMovie={singleMovie} />
      </div>
    </div>
  )
}

export default MovieUpdate