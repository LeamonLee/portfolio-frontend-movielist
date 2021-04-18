import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    zIndex: 100,
  },
  bottomNavigationAction: {
    color: "white",
    "&.Mui-selected":{
      color: theme.palette.secondary.main
    }
  }
}));

export default function MyBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/search");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.bottomNavigationAction}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        className={classes.bottomNavigationAction}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        className={classes.bottomNavigationAction}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        className={classes.bottomNavigationAction}
        label="Search"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}
