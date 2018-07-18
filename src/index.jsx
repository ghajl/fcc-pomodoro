import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import PomodoroClock from './PomodoroClock';

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<PomodoroClock />, rootElement);
} else {
  ReactDOM.render(<PomodoroClock />, rootElement);
}
