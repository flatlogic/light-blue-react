import React, { useMemo } from 'react';
import {
  Row, Col,
} from 'reactstrap';
import Chart from 'react-apexcharts';

import Sparklines from '../../../../components/Sparklines';
import s from './ChangesChart.module.scss';

const ChangesChart = () => {
  const sparklineData = [{data: [3, 6, 2, 4, 5, 8, 6, 8]}];
  const sparklineOptions = {
    colors: ["#64bd63"],
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    }
  };

  const chartSeries = useMemo(() => {
    const base = Array.from({ length: 32 }, () => Math.round(Math.random() * 40) + 8);
    return [
      {
        name: 'pop',
        type: 'column',
        data: base,
      },
      {
        name: 'humidity',
        type: 'line',
        data: base.map((value) => Number(((value * (Math.random() * 0.5)) + 30.1).toFixed(2))),
      },
    ];
  }, []);

  const chartOptions = useMemo(() => ({
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
      },
    },
    stroke: {
      width: [0, 3],
      curve: 'smooth',
    },
    colors: ['#33B252', '#ffffff'],
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

  return (
    <div className={s.changesChart}>
      <div className={`${s.chart} bg-success btlr btrr`}>
        <p className={s.chartValue}><i className="fa fa-caret-up" /> 352.79</p>
        <p className={s.chartValueChange}>+2.04 (1.69%)</p>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={100}
        />
      </div>
      <h4 className={s.chartTitle}><span className="fw-normal">Salt Lake City</span>, Utah</h4>
      <p className="deemphasize">Today 13:34</p>
      <div className="mt">
        <Row>
          <Col xs={6}>
            <p className="h4 m-0">18.7M</p>
            <p className="deemphasize">Shares Traded</p>
          </Col>
          <Col xs={6} className="text-end">
            <p className="h4 m-0">19.9B</p>
            <p className="deemphasize">Market Cap</p>
          </Col>
        </Row>
      </div>
      <div className="mt">
        <Row>
          <Col xs={6}>
            <p className="h3 m-0 text-success fw-semi-bold">+120.93</p>
            <p className="deemphasize">Yearly Change</p>
          </Col>
          <Col xs={6} className="text-end">
            <div
              className="sparkline"
            />
            <Sparklines
              data={sparklineData}
              options={sparklineOptions}
              width={"80"}
              height={"25"}
            />
            <p className="deemphasize">GOOG</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChangesChart;
