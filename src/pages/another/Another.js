import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Another.scss';


class Another extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">Another Page <small>Just like that</small></h1>
        <div>
          <p>Some page content. Feel free to place whatever you want here</p>
        </div>
      </div>
    );
  }
}

export default (withStyles(s)(Another));
