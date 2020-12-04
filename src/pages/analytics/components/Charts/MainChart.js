import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from "reactstrap";
import Widget from "../../../../components/Widget";
import HighchartsReact from 'highcharts-react-official'

export default class RevenueChart extends PureComponent {
  static propTypes = {
    data: PropTypes.any.isRequired,
    isReceiving: PropTypes.bool
  };

  static defaultProps = {
    data: [],
    isReceiving: false
  };
  chartData = () => {
    let data = this.props.data.map(arr => {
      return arr.map(item => {
        return item[1]
      });
    });
    return {
      ...this.ticks,
      ...this.chartOptions,
      series: [
        {
          name: 'Light Blue',
          data: data[0],
          color: '#db2a34',
          fillColor: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1
            },
            stops: [
              [0, 'rgba(244,87,34,.8)'],
              [1, 'rgba(244,87,34, 0)']
            ]
          },
          type: 'areaspline',
          fillOpacity: 1,
          lineWidth: 2
        },
        {
          type: 'spline',
          name: 'RNS App',
          data: data[1],
          color: '#2d8515',
          dashStyle: 'Dash'
        },
        {
          type: 'spline',
          name: 'Sing App',
          data: data[2],
          color: '#2477ff'
        }
      ]
    }
  }

  chartOptions = {
    credits: {
      enabled: false
    },
    chart: {
      height: 350,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    title: false,
    exporting: {
      enabled: false
    },
    legend: {
      verticalAlign: 'top',
      itemStyle: {
        color: "rgba(244, 244, 245, 0.9)"
      },
      itemHoverStyle: {
        color: "rgba(244, 244, 245, 0.6)"
      }
    },
    yAxis: {
      title: false,
      labels: {
        style: {
          color: "#ffffff"
        }
      }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        overflow: 'justify',
        style: {
          color: "#ffffff"
        }
      }
    },
    annotations: {
      visible: false
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          symbol: 'circle'
        },
        pointInterval: 3600000 * 25, // every day
        pointStart: Date.UTC(2018, 12, 19, 0, 0, 0),
        tooltip: {
          pointFormatter() {
            return `<span style="color: ${this.color}">${this.series.name} at ${this.y.toFixed(2)}</span>`;
          }
        }
      },
    }
  };
  ticks = ['Dec 19', 'Dec 25', 'Dec 31', 'Jan 10', 'Jan 14',
    'Jan 20', 'Jan 27', 'Jan 30', 'Feb 2', 'Feb 8', 'Feb 15',
    'Feb 22', 'Feb 28', 'Mar 7', 'Mar 17']

  render() {

    const { isReceiving } = this.props;

    return (
      <Widget
        bodyClass="mt"
        className="mb-xlg"
        fetchingData={isReceiving}
        collapse
        close
        title={
          <Row>
            <Col xs={12} sm={5}>
              <h5>
                Daily <span className="fw-semi-bold">Line Chart</span>
              </h5>
            </Col>
            <Col xs={12} sm={7}>
              <div className="chart-legend"/>
            </Col>
          </Row>
        }
      >
       <HighchartsReact options={this.chartData()} />
      </Widget>
    );
  }
}
