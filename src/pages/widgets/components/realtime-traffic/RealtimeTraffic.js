import React, { useEffect, useMemo, useState } from 'react';
import {
  Progress,
} from 'reactstrap';
import Chart from 'react-apexcharts';

const POINTS_COUNT = 30;

const generatePoints = () =>
  Array.from({ length: POINTS_COUNT }, () => Math.round(Math.random() * 60) + 25);

const RealtimeTraffic = () => {
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
    colors: ['#58D777', '#1870DC'],
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
        data: [...entry.data.slice(1), Math.round(Math.random() * 60) + 25],
      })));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h4 className="mb-lg">Recent <span className="fw-semi-bold">Update</span></h4>
      <h6>Node.js <span className="fw-semi-bold">4.0.1 distribution</span></h6>
      <Progress className="bg-subtle-blue progress-xs" color="danger" value="77" />
      <p className="mt-sm mb fs-mini ">
        <small><span className="circle bg-default text-gray-dark"><i
          className="glyphicon glyphicon-chevron-up align-baseline"
        /></span></small>
        <strong className="px-1">17% higher</strong>
        than last month
      </p>
      <p className="fs-sm text-gray-lighter mb-0">Remaining hours</p>
      <button className="btn btn-xs btn-gray pull-right ms-xs">
        <i className="fa fa-compress" /> track
      </button>
      <button className="btn btn-xs btn-gray pull-right">
        <i className="fa fa-pause" /> pause
      </button>
      <p className="value4">2h 56m</p>
      <br />
      <div className="text-gray-dark chart-overflow-bottom">
        <Chart
          options={options}
          series={series}
          type="line"
          height={130}
        />
      </div>
    </div>
  );
};

export default RealtimeTraffic;
