import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import Widget from '../../../components/Widget';

class Echarts extends PureComponent {
  

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Charts</BreadcrumbItem>
          <BreadcrumbItem active>Echarts Pie</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title">Visual - <span className="fw-semi-bold">Charts</span></h1>
        <Row>
         
        Echarts

        </Row>
      </div>
    );
  }
}

export default Echarts;
