import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  compose,
  withProps,
  lifecycle
} from 'recompose';
import {
  Row,
  Col,
} from 'reactstrap';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import $ from 'jquery';

import s from './Maps.scss';
import Widget from '../../../components/Widget';

class Maps extends React.Component {

  render() {

    const BasicMap = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={ { lat: parseFloat(-37.813179), lng: parseFloat(144.950259) } }
      >
      </GoogleMap>
    ));

    const AddressMap = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>,
      }),
      lifecycle({
        componentWillMount() {
          const refs = {};

          this.setState({
            bounds: null,
            center: {
              lat: 41.9, lng: -87.624
            },
            markers: [],
            onMapMounted: ref => {
              refs.map = ref;
            },
            onBoundsChanged: () => {
              this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter(),
              })
            },
            onSearchBoxMounted: ref => {
              refs.searchBox = ref;
            },
            onPlacesChanged: () => {
              const places = refs.searchBox.getPlaces();
              const bounds = new google.maps.LatLngBounds();

              places.forEach(place => {
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport)
                } else {
                  bounds.extend(place.geometry.location)
                }
              });
              const nextMarkers = places.map(place => ({
                position: place.geometry.location,
              }));
              const nextCenter = $.get(nextMarkers, '0.position', this.state.center);

              this.setState({
                center: nextCenter,
                markers: nextMarkers,
              });
              refs.map.fitBounds(bounds);
            },
          })
        },
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            className="form-control input-transparent mt-n-xs"
            type="text"
            placeholder="Enter Address"
            style={{
              boxSizing: `border-box`,
              border: `none`,
              width: `153px`,
              height: `32px`,
              marginTop: `20px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {props.markers.map((marker, index) =>
          <Marker key={index} position={marker.position}/>
        )}
      </GoogleMap>
    );

    return (
      <div className={s.root}>
        <h2 className="page-title">Maps
          <small> Built-in google & vector maps</small>
        </h2>
        <Row>
          <Col md={6}>
            <Widget title={<h5><i className="fa fa-google-plus"/> Google maps. Basic</h5>}>
              <BasicMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
              />
            </Widget>
          </Col>
          <Col md={6}>
            <Widget title={<h5><i className="fa fa-map-marker" /> Address and location</h5>}>
              <AddressMap />
            </Widget>
          </Col>
        </Row>
      </div>);
  }

}

export default withStyles(s)(Maps);
