import React from 'react';
import Control from './Control';
import Timer from './Timer';
import Clockface from './Clockface';

const formatNumber = num => `0${num}`.slice(-2);

export default class PomodoroClock extends React.Component {
  minTime = 1;

  maxTime = 60;

  baseInterval = 50;

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

  audioRef = React.createRef();

  canvasRef = React.createRef();

  clockfaceWidth = 400;

  clockfaceHeight = 400;

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

  componentWillMount() {
    this.setState(
      {
        screen: {
          width: window.innerWidth,
          height: window.innerHeight,
          ratio: window.devicePixelRatio || 1,
        },
      },
    );
  }

  componentDidMount() {
    const { screen } = this.state;
    const ratio = screen ? screen.ratio : window.devicePixelRatio || 1;
    this.clockface = new Clockface(this.canvasRef, this.clockfaceWidth, this.clockfaceHeight, ratio);
    this.clockface.init();
  }

  setTimerValues = (minutes, seconds, status) => {
    const minLeft = formatNumber(minutes);
    const secLeft = formatNumber(seconds);
    this.setState({ minLeft, secLeft, status }, () => {
      if (minLeft === '00' && secLeft === '00') {
        this.playSound();
      }
    });
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
    const { isTicking, sessionStarted, sessionLength } = this.state;
    if (!sessionStarted) {
      this.clockfaceTicks = sessionLength;
      this.clockfaceTicksCount = this.clockfaceTicks;
      this.ticksSecond = 1000 / this.baseInterval;
      this.timerTicksCount = this.ticksSecond;
      this.setState({ sessionStarted: true });
    }
    if (isTicking) {
      this.stopCountdown();
    } else {
      this.startCountdown();
    }
  }

  playSound = () => {
    this.audioRef.current.currentTime = 0;
    this.audioRef.current.play();
  }

  startCountdown = () => {
    this.animation = setInterval(this.run, this.baseInterval);
    this.setState({ isTicking: true, playButtonLabel: this.playButtonLabel.stop });
  }

  stopCountdown = () => {
    clearInterval(this.animation);
    this.setState({ isTicking: false, playButtonLabel: this.playButtonLabel.start });
  }

  run = () => {
    this.timerTicksCount -= 1;
    this.clockfaceTicksCount -= 1;
    if (this.timerTicksCount === 0) {
      this.timerTicksCount = this.ticksSecond;
      this.proceedCountdown();
    }
    if (this.clockfaceTicksCount === 0) {
      this.clockfaceTicksCount = this.clockfaceTicks;
      this.clockface.drawDial();
    }
  }

  proceedCountdown = () => {
    const {
      minLeft, secLeft, status, breakLength, sessionLength,
    } = this.state;
    let newStatus = status;
    let minutes = parseInt(minLeft, 10);
    let seconds = parseInt(secLeft, 10);
    if (seconds === 0) {
      if (minutes === 0) {
        if (status === this.status.session) {
          minutes = sessionLength - 1;
        } else {
          minutes = breakLength - 1;
        }
        seconds = 59;
      } else {
        seconds = 59;
        minutes -= 1;
      }
    } else {
      if (seconds === 1 && minutes === 0) {
        if (status === this.status.session) {
          newStatus = this.status.break;
          this.clockfaceTicks = breakLength;
        } else {
          newStatus = this.status.session;
          this.clockfaceTicks = sessionLength;
        }
      }
      seconds -= 1;
    }
    this.setTimerValues(minutes, seconds, newStatus);
  }


  handleReset = () => {
    clearInterval(this.animation);
    this.clockface.init();
    this.clockfaceTicks = this.initialState.sessionLength;
    this.clockfaceTicksCount = this.clockfaceTicks;
    this.audioRef.current.currentTime = 0;
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
        <div id="menu-controls-wrapper">
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
        <div className="info-display-wrapper">
          <div id="timer-label">
            {status}
          </div>
          <Timer id="timer" canvasRef={this.canvasRef}>
            {`${minLeft}:${secLeft}`}
          </Timer>
        </div>
        <div className="action-controls-wrapper">
          <button id="start_stop" type="button" onClick={this.handlePlayClick} style={playButtonStyle}>
            {playButtonLabel}
          </button>
          <button id="reset" type="button" onClick={this.handleReset}>
            Reset
          </button>
        </div>
        <audio
          id="beep"
          ref={this.audioRef}
          preload="auto"
          src="static/bell.mp3"
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}
