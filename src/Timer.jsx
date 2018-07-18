import React from 'react';
import PropTypes from 'prop-types';
import Clockface from './Clockface';

const Timer = ({ id, children }) => (
  <div id={`${id}-wrapper`}>
    <Clockface />
    <div id="time-left">
      {children}
    </div>
  </div>
);

export default Timer;

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
