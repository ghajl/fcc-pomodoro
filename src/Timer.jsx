import React from 'react';
import PropTypes from 'prop-types';
import Clockface from './Clockface';

const Timer = ({ id, canvasRef, children }) => (
  <div id={`${id}-wrapper`}>
    <div id="clock">
      <canvas id="circle" ref={canvasRef} />
    </div>
    <div id="time-left">
      {children}
    </div>
  </div>
);

export default Timer;

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  canvasRef: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
