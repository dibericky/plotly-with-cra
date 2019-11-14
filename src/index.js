import React from "react";
import ReactDOM from "react-dom";
import Plot from "react-plotly.js";

import rawData from './data.json'

import "./styles.css";

var xField = 'Date';
var yField = 'Mean_TemperatureC';

var selectorOptions = {
    buttons: [{
        step: 'month',
        stepmode: 'backward',
        count: 1,
        label: '1m'
    }, {
        step: 'month',
        stepmode: 'backward',
        count: 6,
        label: '6m'
    }, {
        step: 'year',
        stepmode: 'todate',
        count: 1,
        label: 'YTD'
    }, {
        step: 'year',
        stepmode: 'backward',
        count: 1,
        label: '1y'
    }, {
        step: 'all',
    }],
};
/*
Plotly.d3.csv(rawDataURL, function(err, rawData) {
    if(err) throw err;

    var data = 
    var layout = ;

    Plotly.plot('graph', data, layout);
});*/

function prepData(rawData) {
    var x = [];
    var y = [];

    rawData.forEach(function(datum, i) {

        x.push(new Date(datum[xField]));
        y.push(datum[yField]);
    });

    return [{
        mode: 'lines',
        x: x,
        y: y
    }];
}
class App extends React.Component {
  render() {
    return (
      <Plot
        data={prepData(rawData)}
        layout={{
          title: 'Time series with range slider and selectors',
          xaxis: {
              rangeselector: selectorOptions,
              rangeslider: {}
          },
          yaxis: {
              fixedrange: true
          }
      }}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
