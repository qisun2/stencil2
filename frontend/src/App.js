import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Material ui styling
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Sub Components
import Navbar from "./Components/Navbar";
import LibrariesPage from "./Components/LibrariesPage";
import LoginPage from "./Components/LoginPage";
import AdminPage from "./Components/AdminPage";
import AccountPage from "./Components/AccountPage";
import ProjectPage from "./Components/ProjectPage";
import EditUserPage from "./Components/EditUserPage";
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
    uid : "",
    role: "",
    isThemeLight: true,
    searchOptions: [],
    allLibraryList:[],
    data: null,
    currentProject: null,
    projList: null,
    login:false
  };

  componentDidMount() {
    // Retrieve all samples.
    const apiBaseURL =  Config.settings.apiURL;
    const libraryEndPoint = Config.settings.librariesEndPoint;

    const url = window.location.href;
    let proj = "";
    const found = url.match("project/([^?]+)");
    if (found){
      proj = found[1];
    }

    let proj2Libs = {};
    let backendURL = apiBaseURL + libraryEndPoint;
    axios
      .get(backendURL, {withCredentials: true})
      .then(res => {
        let theUid = res.data.uid;
        let theRole = res.data.role;
        let items = [];
        let projSearchList = [];
        if (theUid){
          if (Object.keys(res.data.libraries).length > 0){
            res.data.libraries.forEach(library => {
              if (! proj2Libs.hasOwnProperty(library.projectId)){
                proj2Libs[library.projectId]= [];
              }
              proj2Libs[library.projectId].push ({ "dbid": library.dbId, "libid": library.libraryId});
            })

            let theProjList = Object.keys(proj2Libs).sort();

            //console.log("check default proj: " + proj);
            if ((proj === "") && (theProjList.length>0)) {
              proj = theProjList[0];
              console.log("default proj: " + proj);
            }

            if (theProjList){
              projSearchList = theProjList.map(item=>{return({value:item, label:item})})
            }


            const libList = proj2Libs[proj];

            // create the search options; [replace with existing search endpoint in future]
            for (let i = 0; i < libList.length; i++) {
              items.push({ value: libList[i].dbid, label: libList[i].libid });
            }
            // sort the items
            items.sort(compareByLabel);
          }


          this.setState({uid: theUid, role:theRole, allLibraryList: items, currentProject:proj, projList:projSearchList, login:true });
          // console.log(items);
        }
        else
        {
          console.log("login failed");
          this.setState({allLibraryList: [], currentProject:"", projList:[], login:false });
        }


      })
      .catch(err => {
        console.log(err);
      });


  }

  render() {
    const { isThemeLight } = this.state;
    // const { classes } = this.props;

    const appData = {
      uid: this.state.uid,
      role: this.state.role,
      data: this.state.data,
      searchOptions: this.state.searchOptions,
      allLibraryList:  this.state.allLibraryList,
      currentProject: this.state.currentProject,
      projList: this.state.projList,
      login: this.state.login

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
            {this.state.login ? (
              <DataProvider value={appData}>
                <Navbar uid={this.state.uid} role={this.state.role} currentProj={this.state.currentProject} searchOptions={this.state.allLibraryList}  defaultText="Search by experiment ID" handle="getLib"  />
                <Switch>
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/admin" component={AdminPage} />
                  <Route exact path="/account" component={AccountPage} />
                  <Route exact path="/project" component={ProjectPage} />
                  <Route exact path="/edituser/:uid" component={EditUserPage} />
                  <Route
                    exact
                    path="/project/:proj_id"
                    component={LibrariesPage}
                  />
                  <Route
                    exact
                    path="/getLib/:library_id"
                    component={Library}
                  />
                  <Route exact path="/help/" component={Help} />
                  <Route exact path="/" component={LibrariesPage} />
                </Switch>
              </DataProvider>
            ) : (
              <Route component={LoginPage} />
            )}
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
