import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinePlot from "../SubComponents/LinePlot3";
import Radio from "@material-ui/core/Radio";

const styles = {
  card: {
    maxWidth: 1100
  },
  featureHeatmap: {
    width: 250
  },
  sectionTitle: {
    fontSize: 18
  },
  internalHeatmap: {
    width: 230
  },

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

    if (this.props.tabtitles.length > 1)
    {
      showTag = true;
      for (let t in this.props.tabtitles) {
        tabnames.push(<Tab label={this.props.tabtitles[t]} key={count} />);
        count++;
      }
    }
    let tablayout = this.props.layout;
    if (tablayout.length==0) {
      tablayout = [Object.keys(this.props.data[selectedTab]).sort()];
    }

    let plotsizes = this.props.plotsizes;

    let plottitle = this.props.plottitles;

    let thisTab = this.props.data[selectedTab];
    let radioButtonGroupIndex = 0;

    //function for generating plot
    let Plot  =  (props) => {
      let item=props.imgObj;
      let sizes = props.sizes;
      let stepId = (item!==undefined)?(item.stepId):("X");
      if(item==undefined){
        return (
          <Grid item key={stepId}>
                <img
                  src={"../na.png"}
                  width={sizes[0]} 
                  height={sizes[1]}
                />
          </Grid>
        )
    
      }
      else {
        switch (item.dataType.toLowerCase()) {
          case "image":
          case "jpg":
          case "png": 
          return (sizes==undefined)?(
          <Grid item key={stepId}>
            <img src={item.URL} alt={item.dataLabel} title={item.dataLabel}  />
            </Grid>):(                      
          <Grid item key={stepId}>
            <img src={item.URL} alt={item.dataLabel} title={item.dataLabel} width={sizes[0]} height={sizes[1]} />
            </Grid>)
          ;
             
          case "lineplot":
            return (sizes==undefined)?(<Grid item key={stepId}>
              <LinePlot chartData={item.preLoadData?item.preLoadData.compositePlot: {}} width={600} height={500} />
              </Grid>):(
              <Grid item key={stepId}>
              <LinePlot chartData={item.preLoadData?item.preLoadData.compositePlot: {}} width={sizes[0]} height={sizes[1]} />
              </Grid>
            );
          default:
          return(
            <Grid item>
              dataType not known: {item.dataType}
            </Grid>
          )
        };  
      }
    }
    // end of show plot function

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

        {
        //select tab
         showTag && (
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
            {
              //show the layout by rows
              tablayout.map(row=>{
                return (
                  <Grid
                  container
                  spacing={2}
                  direction="row"
                  wrap="nowrap"
                  justify="flex-start"
                  className={classes.mainContainer}
                  >
                    {
                      row.map(stepId=>{
                        if (Array.isArray(stepId)) {
                          radioButtonGroupIndex = radioButtonGroupIndex +1;
                          let rgroup = "radioGroup" + String(radioButtonGroupIndex)
                          let handleRadioChange = event => {
                            this.setState({ [rgroup]: event.target.value });
                          };

                          let seletedStepId = this.state[rgroup];

                          if (seletedStepId === undefined){
                            seletedStepId =stepId[0];
                          } 

                          return (
                            <Grid item>
                            <Grid
                              container
                              spacing={3}
                              direction="row"
                              justify="space-evenly"
                            >
                              {
                                stepId.map(stepIndex=>{
                                  return (
                                    <Grid item>
                                      <Radio
                                        checked={seletedStepId == stepIndex}
                                        onChange={handleRadioChange}
                                        value= {stepIndex}
                                        name= {rgroup}
                                        color="default"
                                      />
                                      {plottitle[stepIndex]}
                                    </Grid>
                                  )
                                } )
                              }
                            </Grid>
                            {   
                            <Plot imgObj={thisTab[seletedStepId]} sizes={plotsizes[seletedStepId]} />    
                                }
                          </Grid>
                          )
                        }
                        else {
                          return (
                            <Plot imgObj={thisTab[stepId]} sizes={plotsizes[stepId]} />
                          )
                        }
                      })
                    }
                  </Grid>
                )
              })
            }
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
