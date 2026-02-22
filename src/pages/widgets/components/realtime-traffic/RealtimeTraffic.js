import React, { useEffect, useRef } from 'react';
import {
  Progress,
} from 'reactstrap';
import Rickshaw from 'rickshaw';
import { useSelector } from 'react-redux';

const RealtimeTraffic = () => {
  const sidebarVisibility = useSelector((store) => store.navigation.sidebarVisibility);
  const graphRef = useRef(null);
  const rickshawChartRef = useRef(null);
  const intervalRef = useRef(null);

  const onResizeRickshaw = () => {
    if (!graphRef.current) {
      return;
    }

    graphRef.current.configure({ height: 130 });
    graphRef.current.render();
  };

  useEffect(() => {
    const seriesData = [[], []];
    const random = new Rickshaw.Fixtures.RandomData(30);

    for (let i = 0; i < 30; i += 1) {
      random.addData(seriesData);
    }
    graphRef.current = new Rickshaw.Graph({
      element: rickshawChartRef.current,
      height: 130,
      realtime: true,
      series: [
        {
          color: '#58D777',
          data: seriesData[0],
          name: 'Uploads',
        }, {
          color: '#1870DC',
          data: seriesData[1],
          name: 'Downloads',
        },
      ],
    });

    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graphRef.current,
      xFormatter: (x) => new Date(x * 1000).toString(),
    });

    hoverDetail.show();

    intervalRef.current = setInterval(() => {
      random.removeData(seriesData);
      random.addData(seriesData);
      graphRef.current.update();
    }, 1000);

    graphRef.current.render();

    window.addEventListener('resize', onResizeRickshaw);

    return () => {
      window.removeEventListener('resize', onResizeRickshaw);
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    onResizeRickshaw();
  }, [sidebarVisibility]);

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
      <div
        ref={rickshawChartRef} className="text-gray-dark chart-overflow-bottom" style={{ height: '130px' }}
      />
    </div>
  );
};

export default RealtimeTraffic;
