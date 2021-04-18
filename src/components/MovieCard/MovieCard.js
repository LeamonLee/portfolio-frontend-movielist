import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ContentModal from "../ContentModal/ContentModal";
import { img_300, unavailable } from "../../config/config";
import "./MovieCard.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%", //  In order to make each card has the same height as another
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      "&" : {
        cursor: "pointer",
        backgroundColor: "white",
        color: "black"
      }
    }
  },
  actionArea: {
    // height: "100%", //  In order to make each card has the same height as another
  },
  badgeRoot: {
    position: "absolute",
    color: "white",
  },
  badgePrimaryColor: {
    position: "absolute",
    color: "white",
    "& > .MuiBadge-badge": {
      backgroundColor: "#2196f3"
    }
  },
  badgeSecondaryColor: {
    position: "absolute",
    color: "white",
    "& > .MuiBadge-badge": {
      backgroundColor: "#f50057"
    }
  },
});

export default function MovieCard(props) {

  const {
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
  } = props;

  const classes = useStyles();

  return (
    <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={vote_average}
          className={`${vote_average > 6 ? classes.badgePrimaryColor : classes.badgeSecondaryColor}`}
        />
        <Card className={classes.root}>
          {/* <CardActionArea className={classes.actionArea}> */}
            <CardMedia
              component="img"
              alt={title}
              title={title}
              image={poster ? `${img_300}${poster}` : unavailable}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <div className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span>{date}</span>
              </div>
            </CardContent>
          {/* </CardActionArea> */}
          
        </Card>
    </ContentModal>
  );
}
