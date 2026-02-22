import React from 'react';
import {
  Row,
  Col,
} from 'reactstrap';

import Widget from '../../../components/Widget';
import echartsData from './mock';

import ReactEchartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, PieChart, LineChart, ScatterChart, GaugeChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import './Echarts.scss';

echarts.use([
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  GaugeChart,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  CanvasRenderer,
]);

const Echarts = () => {
  const ed = echartsData;
  const initOptions = {
    renderer: 'canvas'
  };

  return (
    <div>
        <h1 className="page-title">Visual - <span className="fw-semi-bold">Echarts</span></h1>
        <p>For more information please read full <a href="https://ecomfe.github.io/vue-echarts/">documentation</a></p>
        <Row>
          <Col lg={{size: 10, offset: 1}} xs={12}>
            <Widget
              title={<h5>Echarts <span className="fw-semi-bold">Bar Chart</span></h5>}
              close collapse
            >
              <ReactEchartsCore
                echarts={echarts}
                option={ed.bar}
                opts={initOptions}
              />
            </Widget>
          </Col>
          <Col lg={6} xs={12}>
            <Widget
              title={<h5>Echarts <span className="fw-semi-bold">Pie Chart</span></h5>}
              close collapse
            >
              <ReactEchartsCore
                echarts={echarts}
                option={ed.pie}
                opts={initOptions}
              />
            </Widget>
          </Col>
          <Col lg={6} xs={12}>
            <Widget
              title={<h5>Echarts <span className="fw-semi-bold">Polar Chart</span></h5>}
              close collapse
            >
              <ReactEchartsCore
                echarts={echarts}
                option={ed.polar}
                opts={initOptions}
              />
            </Widget>
          </Col>
          <Col lg={12} xs={12}>
          <Widget
            title={<h5>Echarts <span className="fw-semi-bold">Line Chart</span></h5>}
            close collapse
          >
            <ReactEchartsCore
              echarts={echarts}
              option={ed.line}
              opts={initOptions}
            />
          </Widget>
          </Col>
          <Col lg={6} xs={12}>
          <Widget
            title={<h5>Echarts <span className="fw-semi-bold">Scatter Chart</span></h5>}
            close collapse
          >
            <ReactEchartsCore
              echarts={echarts}
              option={ed.scatter}
              opts={initOptions}
            />
          </Widget>
          </Col>
          <Col lg={6} xs={12}>
          <Widget
            title={<h5>Echarts <span className="fw-semi-bold">Gauge Chart</span></h5>}
            close collapse
          >
            <ReactEchartsCore
              echarts={echarts}
              option={ed.gauge}
              opts={initOptions}
            />
          </Widget>
          </Col>
        </Row>
    </div>
  );
};

export default Echarts;
