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

class AccountPage extends React.Component {


  render() {
    const { classes } = this.props;


    return(
      <div className={classes.root}>
        <div className={classes.content}>


        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
               Stencil Account
            </Typography>
            <Typography component="div" className={classes.contentHolder}>
                   To be added
            </Typography>
            </div>
          </div>
        </Paper>
        </div>
      </div>

    )

  }
}



AccountPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountPage);
