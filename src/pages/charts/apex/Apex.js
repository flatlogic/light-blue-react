import React, { Component } from 'react';
import { 
  Col, 
  Row, 
  Alert, 
  Progress, 
  Button, 
  ButtonGroup, 
  Input, 
  InputGroup, 
  InputGroupAddon,
  Breadcrumb,
  BreadcrumbItem, 
} from 'reactstrap';

import Widget from '../../../components/Widget';

class ApexCharts extends Component {
 
  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Charts</BreadcrumbItem>
          <BreadcrumbItem active>Apex chart</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="page-title">Visual - <span className="fw-semi-bold">Charts</span></h1>
        <Row>ApexCharts</Row>
      </div>
    );
  }
}

export default ApexCharts;
