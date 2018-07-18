import React from 'react';
import PropTypes from 'prop-types';

const Control = ({
  id, children, label, onIncrementClick, onDecrementClick,
}) => (
  <div id={`${id}-wrapper`} className="control">
    <div id={`${id}-label`}>
      {label}
    </div>
    <div className="control-row">
      <button id={`${id}-decrement`} className="controlButton" type="button" onClick={onDecrementClick}>
        &#9660;
      </button>
      <div id={`${id}-length`} className="duration">
        {children}
      </div>
      <button id={`${id}-increment`} className="controlButton" type="button" onClick={onIncrementClick}>
        &#9650;
      </button>
    </div>
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
