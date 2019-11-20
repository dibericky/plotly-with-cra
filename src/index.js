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
    var textList = []

    rawData.forEach(function(datum, i) {

        x.push(new Date(datum[xField]));
        y.push(datum[yField]);
        textList.push(`Min: ${datum.Min_TemperatureC}, Max: ${datum.Max_TemperatureC}`)
    });

    return [{
        marker: {
            color: '#178CF8'
        },
        hoveron: 'points+fills',
        mode: 'lines',
        text: textList,
        fillcolor: '#000',
        x: x,
        y: y
    }];
}
class App extends React.Component {
  render() {
    return (
      <Plot
        // ref: https://github.com/plotly/react-plotly.js/blob/master/README.md#event-handler-props
        onClick={e => console.log('Clicked on', e)}
        onRelayout={e => console.log('Slider is changed', e)}
        data={prepData(rawData)}
        layout={{
          title: 'Time series with range slider and selectors',
          xaxis: {
              rangeslider: {
                  thickness: 0.2,
                  bgcolor: '#F0F3F9'
              },
              zeroline: false,
              showgrid: false
          },
          yaxis: {
              fixedrange: true,
              zeroline: false
          },
          showlegend: false,
          hoverlabel: {
            bgcolor: '#fafafa',
            bordercolor: '#888',
            font: {
              color: '#222',
              family: 'Open Sans',
              size: 16
            }
            }
        }}
      config={{displayModeBar: false}}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
