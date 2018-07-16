import React from 'react';
import PropTypes from 'prop-types';

const Control = ({
  id, children, label, onIncrementClick, onDecrementClick,
}) => (
  <div id={`${id}-wrapper`}>
    <div id={`${id}-label`}>
      {label}
    </div>
    <button id={`${id}-decrement`} type="button" onClick={onDecrementClick}>
      -
    </button>
    <span id={`${id}-length`}>
      {children}
    </span>
    <button id={`${id}-increment`} type="button" onClick={onIncrementClick}>
      +
    </button>
  </div>
);

export default Control;

Control.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onIncrementClick: PropTypes.func.isRequired,
  onDecrementClick: PropTypes.func.isRequired,
};
