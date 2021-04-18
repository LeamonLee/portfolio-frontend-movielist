import React, { useEffect, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  TextField,
  Grid
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import MyPagination from "../../components/MyPagination/MyPagination";
import MovieCard from "../../components/MovieCard/MovieCard";
import getSearch from '../../api/getSearch';

import "./search.css"

const Search = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearchResult = async () => {
    try {
      const res = await getSearch.get(`/${type ? "tv" : "movie"}`, {
        params: { page: page, query: searchText },
      });
  
      setContent(res.data.results);
      setNumOfPages(res.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearchResult();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <>
        <div className="search-container">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearchResult}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        
        <Tabs
          value={type}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ marginBottom: "20px" }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>

        <Grid container direction="row" spacing={2}>
          {content &&
            content.map((c) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={c.id}>
                <MovieCard
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type={type ? "tv" : "movie"}
                  vote_average={c.vote_average}
                />
              </Grid>
            ))}
        </Grid>
        {
          searchText && !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
        }
      
      {numOfPages > 1 && (
        <MyPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  )
}

export default Search
