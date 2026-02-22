import React, { useEffect, useRef, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import fakeWorldData from './MapData';

import s from './YearsMap.module.scss';

am4core.useTheme(am4themes_animated);

const YearsMap = () => {
  const [activeYear, setActiveYear] = useState(2012);
  const mapRef = useRef(null);
  const polygonSeriesRef = useRef(null);

  useEffect(() => {
    const map = am4core.create('map-widget', am4maps.MapChart);
    mapRef.current = map;
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();
    map.contentHeight = 100;
    map.homeZoomLevel = 6;
    map.homeGeoPoint = {
      longitude: 8.863224,
      latitude: 39.599254,
    };
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeriesRef.current = polygonSeries;
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ['AQ'];
    polygonSeries.data = fakeWorldData[2012].areas;
    polygonSeries.tooltip.background.fill = am4core.color('#C7D0FF');
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.label.fill = am4core.color('#495057');
    polygonSeries.tooltip.autoTextColor = false;
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dx = 2;
    map.zoomControl.dy = -21;
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.minusButton.background.fill = am4core.color('#C7D0FF');
    map.zoomControl.plusButton.background.fill = am4core.color('#C7D0FF');
    map.zoomControl.minusButton.background.stroke = am4core.color('#6979C9');
    map.zoomControl.plusButton.background.stroke = am4core.color('#6979C9');
    map.zoomControl.plusButton.background.cornerRadius(3, 3, 3, 3);
    map.zoomControl.minusButton.background.cornerRadius(3, 3, 3, 3);
    map.zoomControl.plusButton.dx = 5;
    map.zoomControl.plusButton.scale = 0.75;
    map.zoomControl.minusButton.scale = 0.75;
    map.zoomControl.plusButton.label.fill = am4core.color('#fff');
    map.zoomControl.minusButton.label.fill = am4core.color('#fff');
    const plusButtonHoverState = map.zoomControl.plusButton.background.states.create('hover');
    plusButtonHoverState.properties.fill = am4core.color('#020202');
    const minusButtonHoverState = map.zoomControl.minusButton.background.states.create('hover');
    minusButtonHoverState.properties.fill = am4core.color('#020202');
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipHTML = '{tooltip}';
    polygonTemplate.fill = am4core.color('#474D84');
    polygonTemplate.stroke = am4core.color('#6979C9');
    polygonTemplate.strokeWidth = 0.1;
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#354D84');
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonTemplate,
      min: am4core.color('#474D84'),
      max: am4core.color('#6979C9'),
    });

    return () => {
      map.dispose();
    };
  }, []);

  useEffect(() => {
    if (polygonSeriesRef.current) {
      polygonSeriesRef.current.data = fakeWorldData[activeYear].areas;
    }
  }, [activeYear]);

  const triggerYear = (year) => {
    setActiveYear(year);
  };

  return (
    <div>
      <div className={s.mapChart}>
        <div className={s.stats}>
          <h6>YEARLY <span className="fw-semi-bold">DISTRIBUTIONS</span></h6>
          <span className="pull-left me-1">
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
          <NavLink active={activeYear === 2012} onClick={() => triggerYear(2012)}>2012</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeYear === 2013} onClick={() => triggerYear(2013)}>2013</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeYear === 2014} onClick={() => triggerYear(2014)}>2014</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeYear === 2015} onClick={() => triggerYear(2015)}>2015</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeYear === 2016} onClick={() => triggerYear(2016)}>2016</NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeYear === 2017} onClick={() => triggerYear(2017)}>2017</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default YearsMap;
