import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DataContext from "./DataContext";
import Config from "../Config";
import axios from "axios";
import { Link} from "react-router-dom";

const styles = theme => ({

  table: {
  },

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

class AdminPage extends React.Component {

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
    return(
      <div className={classes.root}>
        <div className={classes.content}>


        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
               Stencil Admin
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">User</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Role</TableCell>
                    <TableCell align="left">Projects</TableCell>
                    <TableCell align="left">Created</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map((user) => (
                    <TableRow key={user.userName}>
                      <TableCell component="th" scope="row">
                        <Link to={"/edituser/"+ user.userName}>{user.userName}</Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.userEmail}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.role}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.projects}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.createTimestamp.replace(/T.+/, '')}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.status}
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



AdminPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPage);
