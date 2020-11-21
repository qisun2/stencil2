import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Material ui styling
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Material UI components
import LinearProgress from "@material-ui/core/LinearProgress";

// Sub Components
import Navbar from "./Components/Navbar";
import ExploreGrid from "./Components/ExploreGrid";
import LandingPage from "./Components/LandingPage";
import LibrariesPage from "./Components/LibrariesPage";
import Sample from "./Components/Sample";
import Library from "./Components/showLibrary"
import Help from "./Components/Help";
// React contextAPI for common app data
import { DataProvider } from "./Components/DataContext";
import Config from "./Config";


// creating a themes with default fontfamily
const theme1 = createMuiTheme({
  typography: {
    fontFamily: [
      '"Roboto Slab"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ],
    useNextVariants: true
  }
});

const theme2 = createMuiTheme({
  palette: {
    primary: {
      light: "#60ad5e",
      main: "#2e7d32",
      dark: "#005005",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#fff"
    }
  },
  typography: {
    fontFamily: [
      '"Bree Serif"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ],
    useNextVariants: true
  }
});

// styles for the app page.
const styles = theme => ({
  borderLine: {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
});

// simple compare function to sort search suggestions
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const itemA = a.value.toUpperCase();
  const itemB = b.value.toUpperCase();

  let comparison = 0;
  if (itemA > itemB) {
    comparison = 1;
  } else if (itemA < itemB) {
    comparison = -1;
  }
  return comparison;
}

// simple compare function to sort search suggestions
function compareByLabel(a, b) {
  // Use toUpperCase() to ignore character casing
  const itemA = a.label.toUpperCase();
  const itemB = b.label.toUpperCase();

  let comparison = 0;
  if (itemA > itemB) {
    comparison = 1;
  } else if (itemA < itemB) {
    comparison = -1;
  }
  return comparison;
}

class App extends Component {
  state = {
    isThemeLight: true,
    searchOptions: [],
    allLibraryList:[],
    data: null,
  };

  componentDidMount() {
    // Retrieve all samples.
    const apiBaseURL =  Config.settings.apiURL;
    const sampleEndPint = Config.settings.samplesEndpoint;
    const libraryEndPoint = Config.settings.librariesEndPoint;


    axios
      .get(apiBaseURL + sampleEndPint)
      .then(res => {
        const targets = res.data.samples.map(sample => {
          return sample.target;
        });
        //  create an array of unique targets
        const unique = [...new Set(targets)];

        // create the search options; [replace with existing search endpoint in future]
        const items = [];
        for (let i = 0; i < unique.length; i++) {
          items.push({ value: unique[i], label: unique[i] });
        }
        // sort the items
        items.sort(compare);

        this.setState({ data: res.data.samples, searchOptions: items});
        // console.log(items);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(apiBaseURL + libraryEndPoint)
      .then(res => {
        const libList = res.data.libraries.map(library => {
          return { "dbid": library.dbId, "libid": library.libraryId };
        });
        //  create an array of unique targets

        // create the search options; [replace with existing search endpoint in future]
        const items = [];
        for (let i = 0; i < libList.length; i++) {
          items.push({ value: libList[i].dbid, label: libList[i].libid });
        }
        // sort the items
        items.sort(compareByLabel);

        this.setState({allLibraryList: items });
        // console.log(items);
      })
      .catch(err => {
        console.log(err);
      });

    
  }

  render() {
    const { isThemeLight } = this.state;
    // const { classes } = this.props;

    const appData = {
      data: this.state.data,
      searchOptions: this.state.searchOptions,
      allLibraryList:  this.state.allLibraryList
    };

    const background = isThemeLight
      ? "linear-gradient(to bottom,#e8eaf6,#e8eaf6)"
      : "linear-gradient(to bottom,#e8f5e9,#e8f5e9)";

    // set the body color to the theme.
    document.body.style.background = background;

    return (
      <MuiThemeProvider theme={isThemeLight ? theme1 : theme2}>
        <CssBaseline />
        <div>
          <BrowserRouter>
            {this.state.data ? (
              <DataProvider value={appData}>
                <Navbar searchOptions={this.state.allLibraryList}  defaultText="Search by library ID" handle="getLib" />
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/libraries" component={LibrariesPage} />
                  <Route
                    exact
                    path="/factor/:protein_name"
                    component={Sample}
                  />
                  <Route
                    exact
                    path="/getLib/:library_id"
                    component={Library}
                  />
                  <Route exact path="/help/" component={Help} />
                  <Route exact path="/explore/" component={ExploreGrid} />
                </Switch>
              </DataProvider>
            ) : (
              <LinearProgress />
            )}
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
