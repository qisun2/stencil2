import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";


// Sub Components
import Search from "./Search";
import DataContext from "./DataContext";

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

class SimpleLibrariesPage extends React.Component {
  // using the context
  static contextType = DataContext;

  render() {
    const { classes } = this.props;
    const currentYear = new Date().getFullYear();

    // Setting the title of the browser tab
    document.title = "Samples in Stencil";

    return (
      <div className={classes.root}>
        <div className={classes.content}>


          <Paper square>
            {/* Jumbotron or main message */}
            <div className={classes.jumbotron}>
              <div className={classes.container}>
                <Typography variant="h2" gutterBottom>
                  Sample libraries
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  Browse Stencil Libraries
                </Typography>
                <Divider />
                <Typography variant="caption" component="p" gutterBottom>
                  one line description
                </Typography>
              </div>
            </div>
            <Grid
              container
              spacing={2}
              direction="column"
              alignContent="center"
              alignItems="center"
            >
              {/* SearchBar */}
              <Grid item>
                <Search suggestions={this.context.allLibraryList} defaultText="Browse by library ID" handle="getLib" />
              </Grid>

              <Grid item></Grid>
            </Grid>
          </Paper>
          <br />
          <br />
          <Paper square>
            <Grid container spacing={2} direction="column" alignItems="center">
              <Grid item>
                <div className={classes.container}>
                  <Typography variant="h6">Overview</Typography>
                  <Divider />
                  <br />
                  <Typography variant="body1">
                    Stencil is a web based system for visualizing results of data processing pipeline.
                  </Typography>
                  <br />
                  <Divider />
                </div>
              </Grid>
              {/* Footer  Section */}
              <Grid item className={classes.center}>
                <Grid
                  container
                  spacing={4}
                  alignItems={"center"}
                  direction="row"
                  justify="center"
                  alignContent="center"
                  className={classes.footer}
                >
                  <Grid item>
                    <img
                      src="https://via.placeholder.com/150"
                      alt="company_logo1"
                      className={classes.companyLogo}
                    />
                  </Grid>
                  <Grid item>
                    <img
                      src="https://via.placeholder.com/150"
                      alt="company_logo2"
                      className={classes.companyLogo}
                    />
                  </Grid>
                </Grid>
                <br />
                <Divider />
              </Grid>

              {/* copyright info */}
              <Grid item>
                <Typography variant="body2" className={classes.copyrightStyle}>
                  &copy; {currentYear} Cornell
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

SimpleLibrariesPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleLibrariesPage);
