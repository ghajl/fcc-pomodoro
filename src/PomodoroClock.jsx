import React from 'react';
import Control from './Control';
import Timer from './Timer';

const formatNumber = num => `0${num}`.slice(-2);

// const rotateCone = (a, b) => {

// };

export default class PomodoroClock extends React.Component {
  minTime = 1;

  maxTime = 60;

  interval = null;

  status = {
    session: 'Session',
    break: 'Break',
  };

  playButtonLabel = {
    start: 'Start',
    stop: 'Stop',
  };

  initialTimes = {
    breakLength: 5,
    sessionLength: 25,
  };

  initialState = {
    breakLength: this.initialTimes.breakLength,
    sessionLength: this.initialTimes.sessionLength,
    status: this.status.session,
    minLeft: formatNumber(this.initialTimes.sessionLength),
    secLeft: formatNumber(0),
    isTicking: false,
    playButtonLabel: this.playButtonLabel.start,
    sessionStarted: false,
  };

  state = this.initialState;


  setTimerValues = (minutes, seconds, status) => {
    const minLeft = formatNumber(minutes);
    const secLeft = formatNumber(seconds);
    this.setState({ minLeft, secLeft, status });
  }

  handleBreakDecrementClick = () => {
    const { breakLength } = this.state;
    if (breakLength > this.minTime) {
      this.setState(prevState => ({
        breakLength: prevState.breakLength - 1,
      }));
    }
  };

  handleBreakIncrementClick = () => {
    const { breakLength } = this.state;
    if (breakLength < this.maxTime) {
      this.setState(prevState => ({
        breakLength: prevState.breakLength + 1,
      }));
    }
  };

  handleSessionDecrementClick = () => {
    const { sessionLength, sessionStarted } = this.state;
    if (sessionLength > this.minTime) {
      this.setState((prevState) => {
        if (!sessionStarted) {
          return {
            sessionLength: prevState.sessionLength - 1,
            minLeft: formatNumber(prevState.sessionLength - 1),
          };
        }
        return {
          sessionLength: prevState.sessionLength - 1,
        };
      });
    }
  };

  handleSessionIncrementClick = () => {
    const { sessionLength, sessionStarted } = this.state;
    if (sessionLength < this.maxTime) {
      this.setState((prevState) => {
        if (!sessionStarted) {
          return {
            sessionLength: prevState.sessionLength + 1,
            minLeft: formatNumber(prevState.sessionLength + 1),
          };
        }
        return {
          sessionLength: prevState.sessionLength + 1,
        };
      });
    }
  };

  handlePlayClick = () => {
    const { isTicking, sessionStarted } = this.state;
    if (!sessionStarted) {
      this.setState({ sessionStarted: true });
    }
    if (isTicking) {
      this.stopCountdown();
    } else {
      this.startCountdown();
    }
  }

  startCountdown = () => {
    this.interval = setInterval(this.run, 1000);
    this.setState({ isTicking: true, playButtonLabel: this.playButtonLabel.stop });
  }

  stopCountdown = () => {
    clearInterval(this.interval);
    this.setState({ isTicking: false, playButtonLabel: this.playButtonLabel.start });
  }

  run = () => {
    const {
      minLeft, secLeft, status, breakLength, sessionLength,
    } = this.state;
    let newStatus = status;
    let minutes = Number.parseInt(minLeft, 10);
    let seconds = Number.parseInt(secLeft, 10);
    if (seconds === 0) {
      if (minutes === 0) {
        if (status === this.status.session) {
          newStatus = this.status.break;
          minutes = breakLength;
        } else {
          newStatus = this.status.session;
          minutes = sessionLength;
        }
      } else {
        seconds = 59;
        minutes -= 1;
      }
    } else {
      seconds -= 1;
    }
    this.setTimerValues(minutes, seconds, newStatus);
  }

  handleReset = () => {
    clearInterval(this.interval);
    this.setState(this.initialState);
  }

  render() {
    const {
      breakLength, sessionLength, minLeft, secLeft, status, playButtonLabel,
    } = this.state;
    const playButtonStyle = playButtonLabel === this.playButtonLabel.start
      ? { color: '#b0f442' }
      : { color: '#ffa0a0' };
    return (
      <div id="clock-wrapper">
        <div id="controls-wrapper">
          <Control
            id="break"
            label="Break Length"
            onIncrementClick={this.handleBreakIncrementClick}
            onDecrementClick={this.handleBreakDecrementClick}
          >
            {breakLength}
          </Control>
          <Control
            id="session"
            label="Session Length"
            onIncrementClick={this.handleSessionIncrementClick}
            onDecrementClick={this.handleSessionDecrementClick}
          >
            {sessionLength}
          </Control>
        </div>
        <div id="timer-label">
          {status}
        </div>
        <Timer id="timer" label={status}>
          {`${minLeft}:${secLeft}`}
        </Timer>
        <div className="bottom-controls-wrapper">
          <button id="start_stop" type="button" onClick={this.handlePlayClick} style={playButtonStyle}>
            {playButtonLabel}
          </button>
          <button id="reset" type="button" onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
