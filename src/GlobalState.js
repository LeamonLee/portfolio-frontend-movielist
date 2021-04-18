import React, { useReducer } from "react";

export const GlobalContext = React.createContext();

const initialState = {
  
  menuOpen: false,
  snackbarMsg: false,
  themeSelectValue: "Dark"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSnackbarMsg": {
      return {
        ...state,
        snackbarMsg: action.snippet
      };
    }
    case "setThemeSelectValue": {
      return {
        ...state,
        themeSelectValue: action.snippet
      };
    }
    case "setMenuOpen": {
      return {
        ...state,
        menuOpen: action.snippet
      };
    }
    default:
      return state;
  }
};

export const GlobalState = props => {
  const globalState = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};
