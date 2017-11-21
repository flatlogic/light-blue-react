import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
} from 'reactstrap';
import Rickshaw from 'rickshaw';

import Widget from '../../../components/Widget';

import s from './Realtime.scss';

const chartHeight = 300;

class Realtime extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      graph: null,
    };
    this.onResizeRickshaw = this.onResizeRickshaw.bind(this);
  }

  componentDidMount() {
    this.initRickshaw();
    window.addEventListener('resize', this.onResizeRickshaw);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeRickshaw);
  }

  onResizeRickshaw() {
    const config = { gapSize: 0.5, min: 'auto', strokeWidth: 3, height: chartHeight };
    this.state.graph.configure(config);
    this.state.graph.render();
  }

  initRickshaw() {
    let graph = this.state.graph;
    const seriesData = [[], [], [], [], []];
    const random = new Rickshaw.Fixtures.RandomData(150);

    for (let i = 0; i < 150; i += 1) {
      random.addData(seriesData);
    }

    const messages = [
      'Changed home page welcome message',
      'Minified JS and CSS',
      'Changed button color from blue to green',
      'Refactored SQL query to use indexed columns',
      'Added additional logging for debugging',
      'Fixed typo',
      'Rewrite conditional logic for clarity',
      'Added documentation for new methods',
    ];

    graph = new Rickshaw.Graph({
      element: this.rickshawChart,
      height: chartHeight,
      renderer: 'area',
      preserve: true,
      stroke: true,
      series: [
        {
          color: '#4e91ce',
          data: seriesData[0],
          name: 'Belarus',
        }, {
          color: '#3ecd74',
          data: seriesData[1],
          name: 'Canada',
        }, {
          color: '#f2c34d',
          data: seriesData[2],
          name: 'UK',
        }, {
          color: '#f25118',
          data: seriesData[3],
          name: 'US',
        },
      ],
    });

    this.state.graph = this.initRickshawProperty(graph, random, seriesData, messages);

    this.onResizeRickshaw();
  }

  initRickshawProperty(graph, random, seriesData, messages) {
    const hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph,
      xFormatter: x => new Date(x * 1000).toString(),
    });

    hoverDetail.show();

    const annotator = new Rickshaw.Graph.Annotate({
      graph,
      element: this.rickshawTimeline,
    });

    const legend = new Rickshaw.Graph.Legend({
      graph,
      element: this.rickshawLegend,
    });

    const highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({ // eslint-disable-line
      graph,
      legend,
    });

    const shelving = new Rickshaw.Graph.Behavior.Series.Toggle({ // eslint-disable-line
      graph,
      legend,
    });

    const ticksTreatment = 'glow';

    const xAxis = new Rickshaw.Graph.Axis.Time({
      graph,
      ticksTreatment,
    });

    xAxis.render();

    const yAxis = new Rickshaw.Graph.Axis.Y({
      graph,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      ticksTreatment,
    });

    yAxis.render();


    setInterval(() => {
      random.removeData(seriesData);
      random.addData(seriesData);
      graph.update();
    }, 1000);

    const addAnnotation = (force) => {
      if (messages.length > 0 && (force || Math.random() >= 0.9)) {
        annotator.add(seriesData[2][seriesData[2].length - 1].x, messages.shift());
      }
    };

    addAnnotation(true);
    setTimeout(() => {
      setInterval(() => addAnnotation(false), 3000);
    }, 3000);

    return graph;
  }


  render() {
    return (
      <div>
        <h2 className="page-title">Realtime Chart
          <small>Realtime data</small>
        </h2>
        <Row>
          <Col md={1} className="d-none d-md-block" />
          <Col md={10}>
            <Widget title={<h4><i className="fa fa-user" /> Visitors by Countries </h4>}>
              <Row>
                <Col sm={2}>
                  <div
                    id="legend" ref={(r) => {
                      this.rickshawLegend = r;
                    }}
                  />
                </Col>
                <Col sm={10}>
                  <div
                    ref={(r) => {
                      this.rickshawChart = r;
                    }} style={{ height: `${chartHeight}px` }}
                  />
                  <div
                    id="timeline" ref={(r) => {
                      this.rickshawTimeline = r;
                    }}
                  />
                </Col>
              </Row>
            </Widget>
          </Col>

        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Realtime);
