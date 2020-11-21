import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Button, CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import ListIcon from "@material-ui/icons/ViewList";

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

class SimpleLandingPage extends React.Component {
  // using the context
  static contextType = DataContext;

  render() {
    const { classes } = this.props;
    const currentYear = new Date().getFullYear();

    // Setting the title of the browser tab
    document.title = "frontend";

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <Paper square>
            <CardActions>
              <Grid container alignItems={"center"} justify={"space-between"}>
                <Grid item sm={"auto"}>
                  <Link to="/explore">
                    <Button size="small" color="primary">
                      <ListIcon className={classes.leftIcon} />
                      Explore
                    </Button>
                  </Link>

                  <Link to="/help">
                    <Button size="small" color="primary">
                      <InfoIcon className={classes.leftIcon} />
                      Help
                    </Button>
                  </Link>
                </Grid>
                <Grid item sm={"auto"} />
              </Grid>
            </CardActions>
          </Paper>

          <Paper square>
            {/* Jumbotron or main message */}
            <div className={classes.jumbotron}>
              <div className={classes.container}>
                <Typography variant="h2" gutterBottom>
                  frontend
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  tagline
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
                <Search suggestions={this.context.searchOptions} defaultText="Search by protein target" />
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt odit sit, error ad enim iste ullam harum perferendis aliquid ipsam, laboriosam facere nam voluptates. Magnam numquam consequatur debitis corrupti placeat Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt repudiandae velit voluptatem vitae dignissimos aliquid distinctio in. Porro aspernatur obcaecati eos rerum assumenda quae quas natus, delectus excepturi magnam perspiciatis

                    
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

SimpleLandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleLandingPage);
