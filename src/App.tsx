import Home from './routes/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './components/Detail/Detail';
import MovieUpdate from './routes/MovieDetail/MovieUpdate';
import MovieList from './routes/MovieList/MovieList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/:imdbID" element={<Detail />} />
        <Route path="movieList" element={<MovieList />} />
        <Route path='movieList/:id' element={<MovieUpdate/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
