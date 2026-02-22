import React from 'react';
import PropTypes from 'prop-types';

const Skycons = require('skycons')(window || {});

class Skycon extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    autoPlay: PropTypes.bool,
    icon: PropTypes.oneOf([  // eslint-disable-line
      'CLEAR_DAY',
      'CLEAR_NIGHT',
      'PARTLY_CLOUDY_DAY',
      'PARTLY_CLOUDY_NIGHT',
      'CLOUDY',
      'RAIN',
      'SLEET',
      'SNOW',
      'WIND',
      'FOG',
    ]),
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  };

  static defaultProps = {
    color: null,
    autoPlay: true,
    width: '100%',
    height: '100%',
  };

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.skycons = new Skycons({ color: props.color });
  }

  componentDidMount() {
    if (!this.canvasRef.current) {
      return;
    }

    this.skycons.add(this.canvasRef.current, Skycons[this.props.icon]);

    if (this.props.autoPlay) {
      this.skycons.play();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.canvasRef.current) {
      return;
    }

    if (prevProps.icon !== this.props.icon) {
      this.skycons.set(this.canvasRef.current, Skycons[this.props.icon]);
    }
  }

  componentWillUnmount() {
    if (!this.canvasRef.current) {
      return;
    }

    this.skycons.remove(this.canvasRef.current);
    this.skycons.pause();
  }

  play() {
    this.skycons.play();
  }

  pause() {
    this.skycons.pause();
  }

  render() {
    const {
      ...restPops
    } = this.props;

    return (
      <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height} {...restPops} />
    );
  }
}

export default Skycon;
