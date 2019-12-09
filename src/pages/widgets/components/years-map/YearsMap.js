import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


import fakeWorldData from './MapData';

import s from './YearsMap.module.scss';

am4core.useTheme(am4themes_animated);

class YearsMap extends React.Component {

  state = {
    activeYear: 2012,
  };

  componentDidMount() {
    let map = am4core.create("map-widget", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();
    map.contentHeight = 100;
    map.homeZoomLevel = 6;
    map.homeGeoPoint = {
      longitude: 8.863224,
      latitude: 39.599254
    };
    this.polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    this.polygonSeries.useGeodata = true;
    this.polygonSeries.exclude = ["AQ"];
    this.polygonSeries.data = fakeWorldData[this.state.activeYear].areas;
    this.polygonSeries.tooltip.background.fill = am4core.color("#C7D0FF");
    this.polygonSeries.tooltip.getFillFromObject = false;
    this.polygonSeries.tooltip.label.fill = am4core.color("#495057");
    this.polygonSeries.tooltip.autoTextColor = false;
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dx = 2;
    map.zoomControl.dy = -21;
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.minusButton.background.fill = am4core.color("C7D0FF");
    map.zoomControl.plusButton.background.fill = am4core.color("C7D0FF");
    map.zoomControl.minusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.plusButton.background.stroke = am4core.color("#6979C9");
    map.zoomControl.plusButton.background.cornerRadius(3,3,3,3);
    map.zoomControl.minusButton.background.cornerRadius(3,3,3,3);
    map.zoomControl.plusButton.dx = 5;
    map.zoomControl.plusButton.scale = .75;
    map.zoomControl.minusButton.scale = .75;
    map.zoomControl.plusButton.label.fill = am4core.color("#fff");
    map.zoomControl.minusButton.label.fill = am4core.color("#fff");
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#020202");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#020202");
    let polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipHTML = "{tooltip}";
    polygonTemplate.fill = am4core.color("#474D84");
    polygonTemplate.stroke = am4core.color("#6979C9");
    polygonTemplate.strokeWidth = 0.1;
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#354D84");
    this.polygonSeries.heatRules.push({
      "property": "fill",
      "target": polygonTemplate,
      "min": am4core.color("#474D84"),
      "max": am4core.color("#6979C9")
    });
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  triggerYear = (year) => {
    this.setState({
      activeYear: year,
    });
    this.polygonSeries.data = fakeWorldData[this.state.activeYear].areas;
  }

  render() {
    return (
    <div>
      <div className={s.mapChart}>
        <div className={s.stats}>
          <h6>YEARLY <span className="fw-semi-bold">DISTRIBUTIONS</span></h6>
          <span className="pull-left mr-xs">
            <small><span className="circle bg-success text-gray-dark">
              <i className="fa fa-plus" /></span></small>
          </span>
          <p className="h4 m-0">
            <strong>17% last year</strong>
          </p>
        </div>
        <div className={s.map} id="map-widget">
          <span>Alternative content for the map</span>
        </div>
      </div>
      <Nav className="map-controls" pills fill>
        <NavItem>
            <NavLink active={this.state.activeYear === 2012} onClick={() => this.triggerYear(2012)}>2012</NavLink>
        </NavItem>
        <NavItem>
            <NavLink active={this.state.activeYear === 2013} onClick={() => this.triggerYear(2013)}>2013</NavLink>
        </NavItem>
        <NavItem>
            <NavLink active={this.state.activeYear === 2014} onClick={() => this.triggerYear(2014)}>2014</NavLink>
        </NavItem>
        <NavItem>
            <NavLink active={this.state.activeYear === 2015} onClick={() => this.triggerYear(2015)}>2015</NavLink>
        </NavItem>
        <NavItem>
            <NavLink active={this.state.activeYear === 2016} onClick={() => this.triggerYear(2016)}>2016</NavLink>
        </NavItem>
        <NavItem>
            <NavLink active={this.state.activeYear === 2017} onClick={() => this.triggerYear(2017)}>2017</NavLink>
        </NavItem>
      </Nav>
    </div>
    );
  }
}

export default YearsMap;
