import React from 'react';
import Sparklines from '../../../../components/Sparklines';

const NasdaqSparkline = () => {
  const data = [{
    data: [4, 6, 5, 7, 5],
  }];
  const width = '100%';
  const height = 70;
  const options = {
    stroke: {
      width: 1,
    },
    markers: {
      size: 4,
      colors: '#58D777',
      shape: 'circle',
      strokeWidth: 0,
      hover: {
        size: 5,
        colors: '#000',
      },
    },
    colors: [
      '#1870DC',
    ],
    grid: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <Sparklines
      data={data}
      height={height}
      width={width}
      type={'line'}
      options={options}
    />
  );
};

export default NasdaqSparkline;
