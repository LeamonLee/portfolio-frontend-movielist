import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import "./MyPagination.css";

const useStyles = makeStyles(theme => ({
  paginationRoot: {
    "& .MuiPaginationItem-root":{
      color: "#fff",
    },
    "& .MuiPaginationItem-root.MuiPaginationItem-page.Mui-selected": {
      color: "#000",
      backgroundColor: "white"
    }
  }
  
}));

export default function MyPagination({ setPage, numOfPages = 10 }) {

  const classes = useStyles();

  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination-container">
      <Pagination
        className={classes.paginationRoot}
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        // color="primary"
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
