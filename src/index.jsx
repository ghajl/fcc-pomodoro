import React from 'react';
import ReactDom from 'react-dom';
import './style/main.scss';
import PomodoroClock from './PomodoroClock';


ReactDom.render(
  <PomodoroClock />,
  document.getElementById('root'),
);
