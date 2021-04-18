import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';

import Genres from "../../components/Genres/Genres";
import useGenre from "../../hooks/useGenre";
import getMovies from '../../api/getMovies';
import MovieCard from '../../components/MovieCard/MovieCard';
import MyPagination from "../../components/MyPagination/MyPagination";

const Movies = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {

    try {
      const res = await getMovies.get('', {
        params: { page: page, with_genres: genreforURL },
      });
  
      setContent(res.data.results);
      setNumOfPages(res.data.total_pages);
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  console.log("content: ", content);

  return (
    <>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <Grid container direction="row" spacing={2}>
        {content &&
          content.map((c) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={c.id}>
              <MovieCard
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type="movie"
                vote_average={c.vote_average}
              />
            </Grid>
          ))}
      </Grid>
      {numOfPages > 1 && <MyPagination setPage={setPage} numOfPages={numOfPages} />}
    </>
  )
}

export default Movies
