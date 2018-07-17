import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ id, children, label }) => (
  <div id={`${id}-wrapper`}>
    <div id={`${id}-label`}>
      {label}
    </div>
    <div id="time-left">
      {children}
    </div>
  </div>
);

export default Timer;

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Timer.defaultProps = {
  label: '',
};
