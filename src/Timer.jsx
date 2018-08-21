import React from 'react';
import PropTypes from 'prop-types';

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
  canvasRef: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};
