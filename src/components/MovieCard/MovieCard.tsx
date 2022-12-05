import { FC } from "react"
import { Link } from "react-router-dom";

// Material
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';



interface MovieCardProps {
  id: string,
  Title: string,
  Year: string,
  imdbID: any,
  Type: string,
  Poster: string,
}


const MovieCard: FC<MovieCardProps> = (props) => {

  const { id, Title, Year, imdbID, Poster } = props;



  return (
    <Link to={`${imdbID}`}
      style={{ textDecoration: "none" }}>
      <Card key={id} sx={{ maxWidth: 340, minWidth: 200, display: "flex", height: "200" }}>
      <CardMedia
          component="img"
          height="200"
          image={Poster}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {Title} ({Year})
          </Typography>
          <Typography paragraph sx={{fontSize: "12px"}}>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, at?
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default MovieCard