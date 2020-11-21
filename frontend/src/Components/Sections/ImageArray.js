import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
  card: {
    maxWidth: 1100
  },
  featureHeatmap: {
    width: 250
  },
  mainContainer: {
    overflow: "scroll"
  },
  sectionTitle: {
    fontSize: 18
  },
  internalHeatmap: {
    width: 230
  }
};

class ImageArray extends React.Component {

  state = {
    selectedTab: 0
  };

  // handling tab changes
  handleChange = (event, selectedTab) => {
    this.setState({
      selectedTab: selectedTab
    });
  };
  
  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;
    const tabExtender = { scrollable: classes.scroller };

    let tabnames = [];
    let showTag = false;
    let count = 0;

    if (this.props.tabtitles.length > 0)
    {
      showTag = true;
      for (let t in this.props.tabtitles) {
        tabnames.push(<Tab label={this.props.tabtitles[t]} key={count} />);
        count++;
      }
    }


    return (
      <div className={classes.card}>
        {/* Header */}
        <Typography
          variant="overline"
          component="h5"
          gutterBottom
          className={classes.sectionTitle}
        >
          {this.props.title}
        </Typography>

        <Paper>

        { showTag && (
            <Tabs
              value={selectedTab}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="on"
              classes={tabExtender}
            >
              {tabnames}
            </Tabs>
        ) }



          <CardContent className={classes.sectionHolder}>
            <Grid
              container
              spacing={2}
              direction="row"
              wrap="nowrap"
              justify="flex-start"
              className={classes.mainContainer}
            >
              {
                this.props.data[selectedTab].map(item => {
                  return (
                    <Grid item>
                    <img src={item.URL} alt={item.dataLabel} title={item.dataLabel} />
                    </Grid>
                  );
                })
              }
            </Grid>
          </CardContent>
        </Paper>
      </div>
    );
  }
}

ImageArray.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageArray);
