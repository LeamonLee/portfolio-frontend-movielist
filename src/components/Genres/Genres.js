import { useEffect } from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import getGenres from "../../api/getGenres";

const useStyles = makeStyles(theme => ({
  chipRoot:{
    margin: 2
  }
}));

const Genres = (props) => {
  const {
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
  } = props;

  const classes = useStyles();

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await getGenres.get(`/${type}/list`);
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres && selectedGenres.map((genre) => (
        <Chip
          className={classes.chipRoot}
          label={genre.name}
          key={genre.id}
          color="secondary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres && genres.map((genre) => (
        <Chip
          className={classes.chipRoot}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
