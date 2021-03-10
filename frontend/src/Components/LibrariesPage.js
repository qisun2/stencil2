import React from "react";
import PropTypes from "prop-types";

// MaterialUI packages
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
  }
});

class SimpleLibrariesPage extends React.Component {
  // using the context
  static contextType = DataContext;

  render() {
    const { classes } = this.props;

    // Setting the title of the browser tab
    document.title = "Home";

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
                  Browse Stencil Libraries (User: {this.context.uid})
                </Typography>
                <Divider />
              </div>
            </div>
            <Grid
              container
              spacing={2}
              direction="row"
              alignContent="center"
              alignItems="center"
            >
              {/* SearchBar */}
              <Grid item>
                <Search suggestions={this.context.projList} defaultText={"Project ID" + this.context.currentProject} handle="project" />
              </Grid>

              <Grid item>
                <Search suggestions={this.context.allLibraryList} defaultText="Browse by experiment ID" handle="getLib" />
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
                  <Typography variant="h6">Project Overview</Typography>
                  <Divider />
                  <br />
                  <Typography variant="body1">
                    Project summary.
                  </Typography>
                  <br />
                  <Divider />
                </div>
              </Grid>

              <br />
              <br />

              {/* explore samples here */}

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
