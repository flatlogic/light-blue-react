import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const POINTS_COUNT = 30;

const generatePoints = () =>
  Array.from({ length: POINTS_COUNT }, () => Math.round(Math.random() * 60) + 20);

const RickshawGraph = ({ height }) => {
  const [series, setSeries] = useState([
    { name: 'Uploads', data: generatePoints() },
    { name: 'Downloads', data: generatePoints() },
  ]);

  const options = useMemo(() => ({
    chart: {
      animations: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2.5,
      curve: 'smooth',
    },
    colors: ['#2477ff', '#2d8515'],
    legend: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
  }), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeries((prev) => prev.map((entry) => ({
        ...entry,
        data: [...entry.data.slice(1), Math.round(Math.random() * 60) + 20],
      })));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={height}
    />
  );
};

RickshawGraph.propTypes = {
  height: PropTypes.number,
};

RickshawGraph.defaultProps = {
  height: 100,
};

export default RickshawGraph;
