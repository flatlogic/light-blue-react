import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { Link } from 'react-router-dom';

// import Widget from '../../components/Widget';
import s from './Dashboard.scss';

class Dashboard extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      alert1Visible: true,
      alert2Visible: true,
      alert3Visible: true,
      alert4Visible: true,
    };
  }

  render() {
    return (
      <div>Dashboard</div>
    );
  }
}

export default (withStyles(s)(Dashboard));
