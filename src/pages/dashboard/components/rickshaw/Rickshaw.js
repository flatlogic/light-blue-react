import React, { useEffect, useRef } from 'react';
import Rickshaw from 'rickshaw';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const RickshawGraph = ({ height }) => {
  const sidebarVisibility = useSelector((store) => store.navigation.sidebarVisibility);
  const rickshawChartRef = useRef(null);
  const graphRef = useRef(null);
  const intervalRef = useRef(null);

  const onResizeRickshaw = () => {
    if (!graphRef.current) {
      return;
    }

    graphRef.current.configure({ height });
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
      height,
      series: [
        {
          color: '#2477ff',
          data: seriesData[0],
          name: 'Uploads',
        }, {
          color: '#2d8515',
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
  }, [height]);

  useEffect(() => {
    onResizeRickshaw();
  }, [sidebarVisibility, height]);

  return (
    <div
      ref={rickshawChartRef}
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
