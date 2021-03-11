import React from "react";
import { Link} from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import { Typography, Button, Paper,  Grid } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer,  TableHead, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Config from "../Config";
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
  }
});

class ProjectPage extends React.Component {

  static contextType = DataContext;
  state = {"users":[]};
  componentDidMount() {
    axios
      .get(Config.settings.apiURL + "/libraries/alluid", {withCredentials: true})
      .then(res => {
        this.setState({"users":res.data.users});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    // Setting the title of the browser tab
    document.title = "Project Information";

    return(
      <div className={classes.root}>
        <div className={classes.content}>
        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Project Information
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Project ID</TableCell>
                    <TableCell align="left">Users</TableCell>
                    <TableCell align="left">Experiment IDs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map((user) => (
                    <TableRow key={user.userName}>
                      <TableCell component="th" scope="row">
                        {user.projects}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={"/edituser/"+ user.userName}>{user.userName}</Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.createTimestamp.replace(/T.+/, '')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>
          </div>
        </Paper>
        </div>
      </div>

    )

  }
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectPage);
