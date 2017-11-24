import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import jQuery from 'jquery';
import { withRouter } from 'react-router-dom';
/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!jqvmap/dist/jquery.vmap';
import 'imports-loader?jQuery=jquery,this=>window!jqvmap/dist/maps/jquery.vmap.world';
import 'imports-loader?jQuery=jquery,this=>window!jqvmap/dist/maps/continents/jquery.vmap.australia';
import 'imports-loader?jQuery=jquery,this=>window!jqvmap/dist/maps/jquery.vmap.europe';
import 'imports-loader?jQuery=jquery,this=>window!jqvmap/dist/maps/jquery.vmap.usa';
/* eslint-enable */

import s from './VectorMap.scss';

class VectorMap extends React.Component {
  static propTypes = {
    map: PropTypes.string,
    zoomed: PropTypes.bool,
    options: PropTypes.object, //eslint-disable-line
    // dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    map: 'world_en',
    zoomed: false,
    options: {
      enableZoom: true,
      hoverColor: 'orange',
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: 'red',
      selectedRegion: null,
      showTooltip: true,
      // onRegionClick: (event, code, region) => {
        // console.log(code);
      // },
    },
  };

  componentDidMount() {
    this.initVectorMap();
  }

  initVectorMap() {
    const options = Object.assign({}, this.props.options);
    options.map = this.props.map;
    options.scaleColors = ['#b6d6ff', '#005ace'];
    jQuery(this.el).empty();
    jQuery(this.el).vectorMap(options);

    if (this.props.zoomed) {
      jQuery(this.el).vectorMap('zoomIn');
      jQuery(this.el).vectorMap('zoomIn');
      jQuery(this.el).vectorMap('zoomIn');
    }
  }

  render() {
    return (
      <div
        className={s.map}
        ref={(r) => {
          this.el = r;
        }}
      />
    );
  }
}

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(VectorMap)));

