import React, { Children, cloneElement, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const SWIPE_LEFT = 2;
const SWIPE_RIGHT = 4;

const chainHandlers = (firstHandler, secondHandler) => (event) => {
  if (typeof firstHandler === 'function') {
    firstHandler(event);
  }

  if (typeof secondHandler === 'function') {
    secondHandler(event);
  }
};

const SwipeArea = ({
  children,
  onSwipe,
  minDistance,
  maxVerticalOffset,
}) => {
  const touchStartRef = useRef(null);

  const handleTouchStart = useCallback((event) => {
    const touch = event.changedTouches?.[0];

    if (!touch) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
    };
  }, []);

  const handleTouchCancel = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  const handleTouchEnd = useCallback((event) => {
    if (typeof onSwipe !== 'function' || !touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches?.[0];

    if (!touch) {
      return;
    }

    const { x, y, timestamp } = touchStartRef.current;
    touchStartRef.current = null;

    const deltaX = touch.clientX - x;
    const deltaY = touch.clientY - y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < minDistance || absY > maxVerticalOffset || absX <= absY) {
      return;
    }

    const elapsedTime = Math.max(Date.now() - timestamp, 1);

    onSwipe({
      direction: deltaX > 0 ? SWIPE_RIGHT : SWIPE_LEFT,
      deltaX,
      deltaY,
      velocityX: deltaX / elapsedTime,
    });
  }, [maxVerticalOffset, minDistance, onSwipe]);

  const child = Children.only(children);

  return cloneElement(child, {
    onTouchStart: chainHandlers(child.props.onTouchStart, handleTouchStart),
    onTouchEnd: chainHandlers(child.props.onTouchEnd, handleTouchEnd),
    onTouchCancel: chainHandlers(child.props.onTouchCancel, handleTouchCancel),
  });
};

SwipeArea.propTypes = {
  children: PropTypes.element.isRequired,
  onSwipe: PropTypes.func,
  minDistance: PropTypes.number,
  maxVerticalOffset: PropTypes.number,
};

SwipeArea.defaultProps = {
  onSwipe: null,
  minDistance: 40,
  maxVerticalOffset: 80,
};

export default SwipeArea;
