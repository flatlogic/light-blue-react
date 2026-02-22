import React, { useEffect, useRef } from 'react';
import Rickshaw from 'rickshaw';
import {
  Row, Col,
} from 'reactstrap';
import { useSelector } from 'react-redux';

import Sparklines from '../../../../components/Sparklines';
import s from './ChangesChart.module.scss';

const ChangesChart = () => {
  const sidebarVisibility = useSelector((store) => store.navigation.sidebarVisibility);
  const chartRef = useRef(null);
  const graphRef = useRef(null);
  const sparklineData = [{data: [3, 6, 2, 4, 5, 8, 6, 8]}];
  const sparklineOptions = {
    colors: ["#64bd63"],
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    }
  };

  const onResizeRickshaw = () => {
    if (!graphRef.current) {
      return;
    }

    graphRef.current.configure({ height: 100 });
    graphRef.current.render();
  };

  useEffect(() => {
    const seriesData = [[], []];
    const random = new Rickshaw.Fixtures.RandomData(32);
    for (let i = 0; i < 32; i += 1) {
      random.addData(seriesData);
    }

    graphRef.current = new Rickshaw.Graph({
      element: chartRef.current,
      height: '100',
      renderer: 'multi',
      series: [{
        name: 'pop',
        data: seriesData.shift().map((d) => ({ x: d.x, y: d.y })),
        color: '#33B252',
        renderer: 'bar',
        gapSize: 2,
        min: 'auto',
        strokeWidth: 3,
      }, {
        name: 'humidity',
        data: seriesData.shift()
          .map((d) => ({ x: d.x, y: ((d.y * (Math.random() * 0.5)) + 30.1) })),
        renderer: 'line',
        color: '#fff',
        gapSize: 2,
        min: 'auto',
        strokeWidth: 3,
      }],
    });

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graphRef.current,
      xFormatter: (x) => new Date(x * 1000).toString(),
    });

    hoverDetail.show();
    graphRef.current.render();

    window.addEventListener('resize', onResizeRickshaw);
    return () => {
      window.removeEventListener('resize', onResizeRickshaw);
    };
  }, []);

  useEffect(() => {
    onResizeRickshaw();
  }, [sidebarVisibility]);

  return (
    <div className={s.changesChart}>
      <div className={`${s.chart} bg-success btlr btrr`}>
        <p className={s.chartValue}><i className="fa fa-caret-up" /> 352.79</p>
        <p className={s.chartValueChange}>+2.04 (1.69%)</p>
        <div
          ref={chartRef}
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
