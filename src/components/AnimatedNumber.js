import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function AnimatedNumber({
  value,
  initialValue,
  duration,
  stepPrecision,
  formatValue,
}) {
  const initial = Number.isFinite(initialValue) ? initialValue : Number(value) || 0;
  const [displayValue, setDisplayValue] = useState(initial);
  const previousValueRef = useRef(initial);
  const frameRef = useRef(null);

  useEffect(() => {
    const to = Number(value);
    const from = Number(previousValueRef.current) || 0;

    if (!Number.isFinite(to)) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return undefined;
    }

    if (!duration || duration <= 0) {
      setDisplayValue(to);
      previousValueRef.current = to;
      return undefined;
    }

    let startTime = null;
    const tick = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const next = from + (to - from) * progress;
      const rounded = Number(next.toFixed(stepPrecision));
      setDisplayValue(rounded);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        previousValueRef.current = to;
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, stepPrecision, value]);

  if (typeof formatValue === 'function') {
    return <>{formatValue(displayValue)}</>;
  }

  return <>{displayValue}</>;
}

AnimatedNumber.defaultProps = {
  duration: 300,
  formatValue: null,
  initialValue: 0,
  stepPrecision: 0,
};

AnimatedNumber.propTypes = {
  duration: PropTypes.number,
  formatValue: PropTypes.func,
  initialValue: PropTypes.number,
  stepPrecision: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default AnimatedNumber;
