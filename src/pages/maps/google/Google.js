import React from 'react';
import Widget from '../../../components/Widget';
import GoogleMapFrame from '../../../components/GoogleMapFrame';

import s from './Google.module.scss';

const Maps = () => (
  <div>
    <h1 className="page-title">
      Google <span className="fw-semi-bold">Maps</span>
    </h1>
    <Widget
      title={<h4>Google Maps <small className="text-muted">Default and customized</small></h4>}
      collapse close
    >
      <div className={s.MapContainer}>
        <GoogleMapFrame
          center={{ lat: -37.813179, lng: 144.950259 }}
          zoom={12}
          title="Melbourne map"
        />
      </div>
    </Widget>
  </div>
);

export default Maps;
