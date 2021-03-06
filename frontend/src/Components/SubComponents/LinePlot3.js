import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ImportIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';

// sub component
import { ResponsiveLine, Line } from "@nivo/line";
import FullScreenDialog from "./FullScreenDialog3";

// component styles

const useStyles = makeStyles({
  card :props=> ({
    minWidth: 275
  }),
  exportButton:props=> ({
    marginLeft: "88%"
  }),
  chartContainer: props=>({
    height: props.height,
    width: props.width
  })

});

function FeatureCompositePlot(props) {
  const  classes  = useStyles(props);


  var chartData = props.chartData;
  if (chartData["Xaxis"] === undefined ){
    return "The data does not hava a required key Xaxis";
  }
  if (chartData["Yaxis"] === undefined ){
    return "The data does not hava a required key Yaxis";
  }

  let xValues = props.chartData.Xaxis.split(",");
  let Yaxis = props.chartData.Yaxis;
  let plotData = [];
  let plotColors = [];

  let yMaxValue = 5;

  Yaxis.forEach(element => {
    let datasetTitle = element.title? element.title : "";
    let yColor = element.color;
    let yValues = element.data.split(",");
    let lineData = [];

    if (! yColor.startsWith("#")) {
      yColor = "#" + yColor;
    }
    plotColors.push(yColor);

    for (let i = 0; i < yValues.length; i++) {

        //if (i%2 == 0){
          let x = parseInt(xValues[i]);
          let y = parseFloat(yValues[i]);
  
          if (y>yMaxValue){
            yMaxValue = y;
          }
          lineData.push({
            x: x,
            y: y
          });
        //}


    }
    plotData.push({
      id: datasetTitle,
      data: lineData
    });

  });

  const plotOptions = {
    margin: { top: 5, right: 20, bottom: 80, left: 60 },
    xScale: {
      type: "linear",
      stacked: false,
      min: -(xValues.length / 2),
      max: xValues.length / 2
    },
    yScale: { type: "linear", stacked: false, min: 0, max: yMaxValue },
    axisBottom: {
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Distance from TSS (bp)",
      legendOffset: 46,
      legendPosition: "middle"
    },
    axisLeft: {
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Occupancy",
      legendOffset: -50,
      legendPosition: "middle"
    },
    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab",
      markers: {
        textColor: "black",
        fontSize: 12
      }
    },
    colors: plotColors,
    enablePoints: false,
    legends: [
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 80,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 120,
        itemHeight: 20,
        itemOpacity: 1.0,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)"
      }
    ]
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Line, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: plotData,

        width: 1200,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    const element = document.createElement("a");
    const file = new Blob([svgString]);
    element.href = URL.createObjectURL(file);
    element.download = "linePlot.svg";
    // Required for this to work in FireFox
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog
            plotData ={plotData}
            colors={plotColors}
            ymin={0}
            ymax={yMaxValue}
            axisTickValues={40}
          />
        </Grid>
        <Grid>
          <IconButton
            className={classes.exportButton}
            color="primary"
            onClick={handleExport}
          >
            <Tooltip title="Export as SVG" aria-label="export as svg">
              <ImportIcon />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>

      <CardContent className={classes.chartContainer}>
        <ResponsiveLine
          data={plotData}
          axisTop={null}
          axisRight={null}
          {...plotOptions}
          enablePoints={false}
          enableSlices={"x"}
          markers={[
            {
              axis: "x",
              value: 0,
              lineStyle: {
                stroke: "#000",
                strokeWidth: 2,
                strokeDasharray: (10, 8)
              },
              legend: ""
            }
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 80,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 120,
              itemHeight: 20,
              itemOpacity: 1.0,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)"
            }
          ]}
        />
      </CardContent>
    </div>
  );
}

FeatureCompositePlot.propTypes = {
  classes: PropTypes.object.isRequired
};

export default FeatureCompositePlot;