import React, {useEffect, useContext} from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import MyBottomNavigation from "./components/MyBottomeNavigation/MyBottomNavigation";

import { GlobalContext } from "./GlobalState";

import './App.css';

const body = document.querySelector("body");

const defaultTheme = {
  palette: {
    primary: {
      main: "#424242"
    },
    secondary: blue
  },
};

const darkTheme = {
  palette: {
    type: "dark",
    primary: {
      main: "#424242"
    },
    secondary: blue
  }
};

const muiDarkTheme = createMuiTheme(darkTheme);
const muiDefaultTheme = createMuiTheme(defaultTheme);

function App() {

  const [{ themeSelectValue }, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    if (themeSelectValue === "Dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [themeSelectValue]);

  return (
      <MuiThemeProvider
        theme={themeSelectValue === "Dark" ? muiDarkTheme : muiDefaultTheme}>
        <CssBaseline />  
        <Header />
        <BrowserRouter>
          <div className="app">
            <Container>
              <Switch>
                <Route path="/" component={Trending} exact />
                <Route path="/movies" component={Movies} />
                <Route path="/series" component={Series} />
                <Route path="/search" component={Search} />
              </Switch>
            </Container>
          </div>
          <MyBottomNavigation />
        </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
