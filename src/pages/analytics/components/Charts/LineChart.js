import React from 'react';
import Sparklines from '../../../../components/Sparklines'

const LineChart = ({ data, height, width, options }) => (
  <Sparklines 
    data={data} 
    height={height}
    width={width}
    type={"line"}
    options={options} 
  />
);

export default LineChart;
