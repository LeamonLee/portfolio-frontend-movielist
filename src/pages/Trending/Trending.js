import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';

import getTrending from '../../api/getTrending';
import MovieCard from '../../components/MovieCard/MovieCard';
import MyPagination from "../../components/MyPagination/MyPagination";

const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {

    try {
      const res = await getTrending.get('', {
        params: { page: page },
      });
  
      setContent(res.data.results);
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  console.log("content: ", content);

  return (
    <>
      <span className="pageTitle">Trending Today</span>
      <Grid container direction="row" spacing={2}>
        {content &&
          content.map((c) => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={c.id}>
              <MovieCard
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            </Grid>
          ))}
      </Grid>
      <MyPagination setPage={setPage} />
    </>
  )
}

export default Trending
