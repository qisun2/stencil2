import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Config from "../Config";
import Button from '@material-ui/core/Button';
import { Route, Redirect} from "react-router-dom";

const styles = theme => ({
  root: {
    height: "100%",
    maxWidth: 980,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    padding: 20
  },
  footer: {
    /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
    flexShrink: 0
  },
  jumbotron: {
    padding: "2rem 2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "4rem 0rem"
    }
  },
  container: {
    maxWidth: "1140px",
    paddingRight: 15,
    paddingLeft: 15,
    margin: "auto"
  },
  center: {
    margin: "auto",
    maxWidth: 1140
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  companyLogo: {
    width: 160
  },
  copyrightStyle: {
    textAlign: "center"
  }
});

class LoginPage extends React.Component {
  state = {
    selectedTab: 0,
    forceTabChange: 0
  };
  // handling tab changes
  handleChange = (event, selectedTab) => {
    this.setState({
      selectedTab: selectedTab,
      forceTabChange: 1
    });
  };

  render() {
    console.log("read params now");
    let postBackString = this.props.location.search;
    var { selectedTab,  forceTabChange} = this.state;
    const { classes } = this.props;
    let tabnames = [];
    tabnames.push(<Tab label="Local Login" key="0" />);
    tabnames.push(<Tab label="Single Sign-on" key="1" />);
    tabnames.push(<Tab label="Register" key="2" />);

    console.log("selected ");
    console.log(selectedTab)

    let content = "";
    let headerMsg = "";
    let headerColor = "";

    if ((postBackString === "?1") && (forceTabChange===0))
    {
      //register successful, please login
      selectedTab =0;
      content = <LoginBox />
      headerMsg = "You have successfully registered. Please login.";
      headerColor = "primary";
    }
    else if ((postBackString === "?2") && (forceTabChange===0))
    {
      //login failed
      selectedTab =0;
      content = <LoginBox />
      headerMsg = "Login failed. Username and/or password are not correct!";
      headerColor = "error";
    }
    else if ((postBackString === "?3") && (forceTabChange===0))
    {
      //login failed
      selectedTab =2;
      content = <Register />
      headerMsg = "Registration failed. The passwords do not match. Please try again.";
      headerColor = "error";
    }
    else if ((postBackString === "?4") && (forceTabChange===0))
    {
      //login failed
      selectedTab =2;
      content = <Register />
      headerMsg = "Registration failed. The user name is taken. Please try again!";
      headerColor = "error";
    }
    else if ((postBackString === "?5") && (forceTabChange===0))
    {
      //login failed
      selectedTab =2;
      content = <Register />
      headerMsg = "User name not registered! Please register first.";
      headerColor = "error";
    }
    else
    {
      switch (selectedTab) {
        case 0:
          content = <LoginBox />
        break;
        case 1:
          content = <SSOlogin />
        break;
        case 2:
          content = <Register />
        break;
        default:
          content = <LoginBox />

      }
    }


    return(
      <div className={classes.root}>
        <div className={classes.content}>


        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
               Stencil Login
            </Typography>
            {(headerMsg)?(<Typography variant="h6" color={headerColor} gutterBottom>
               {headerMsg}
            </Typography>):("")
            }
              <Typography component="div" className={classes.contentHolder}>
                    <Tabs
                      value={selectedTab}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      {tabnames}
                    </Tabs>
                    <br />
                    {content}
              </Typography>
            </div>
          </div>
        </Paper>
        </div>
      </div>

    )

  }
}

class SSOlogin extends React.Component{

  componentDidMount(){
    window.location.href = Config.settings.SSOURL;
  }
  render() {
    return(
      <div>
        <Typography variant="subtitle1" gutterBottom>
            <a href={Config.settings.SSOURL}>Click</a> if not redirected 
        </Typography>
      </div>
    )
  }
}

class Register extends React.Component{
  render() {
    return (
              <div>
                <form
                    id="main-login"
                    action={Config.settings.apiURL + "/register"}
                    method="post">
                <Typography variant="subtitle1" gutterBottom>
                 * SSO users please leave the password fields blank.<br />
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item  xs={8}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                  <Grid item  xs={8}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                  <Grid item  xs={8}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                  <Grid item  xs={8}>
                  <input
                    type="password"
                    name="password2"
                    placeholder="Repeat password"
                    size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" alignItems="center">
                  <Grid item  xs={3}>
                  <br />
                  <Button type="submit" color="primary" fullWidth variant="contained">Register</Button>
                  </Grid>
                </Grid>
                </form>
              </div>
    );
  }
}

class LoginBox extends React.Component{
  render() {
    const { classes } = this.props;
    return (
              <div>
                <form
                    id="main-login"
                    action={Config.settings.apiURL + "/login"}
                    method="post">
                <Grid container spacing={2} alignItems="center">
                  <Grid item  xs={8}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                  <Grid item  xs={8}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    size="small" variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction="row" alignItems="center">
                  <Grid item  xs={3}>
                  <br />
                  <Button type="submit" color="primary" fullWidth variant="contained">Submit</Button>
                  </Grid>
                </Grid>
                </form>
              </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
