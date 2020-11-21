import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  CardActions,
  Tooltip,
  IconButton
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search";
import DataContext from "./DataContext";
import InfoIcon from "@material-ui/icons/InfoOutlined";

// component styles
const styles = {
  appBar: {
    background: "#eeeeee"
  },
  appBar2: {
    background: "#fff"
  }
};

class LandingPage extends React.Component {
  static contextType = DataContext;

  render() {
    const { classes } = this.props;
    const location = this.props.location.pathname;

    return ((location !== "/") && (location !== "/libraries")) ? (
      <Paper
        square
        elevation={0}
        className={classes.appBar2}
      >
        <CardActions>
          <Grid container alignItems={"center"} justify={"space-between"}>
            <Grid item sm={"auto"}>
              <Grid
                container
                spacing={1}
                alignItems={"center"}
                justify={"space-between"}
              >
                {/* Filter Menu */}
                <Grid item sm={"auto"} />

                <Grid item sm={"auto"}>
                <Search suggestions={this.props.searchOptions} defaultText={this.props.defaultText} handle={this.props.handle} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={"auto"}>
              {/* just a place holder to separate the icons */}
            </Grid>

            <Grid item sm={"auto"}>
              <Link to="/libraries">
                <Tooltip title="Home" aria-label="home">
                  <IconButton color="primary">
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link to="/help">
                <Tooltip title="Help" aria-label="help">
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
          </Grid>
        </CardActions>
      </Paper>
    ) : (
      " "
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(LandingPage));