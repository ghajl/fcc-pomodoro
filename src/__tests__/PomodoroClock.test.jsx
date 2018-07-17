import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PomodoroClock from '../PomodoroClock';
import Control from '../Control';

describe('PomodoroClock', () => {
  const wrapper = mount(<PomodoroClock />);
  it('renders #break-label', () => {
    const elem = wrapper.find('#break-label');
    expect(elem.length).toEqual(1);
  });

  it('#break-label contains string "Break Length"', () => {
    const elem = wrapper.find('#break-label');
    expect(elem.text()).toEqual('Break Length');
  });

  it('renders #session-label', () => {
    const elem = wrapper.find('#session-label');
    expect(elem.length).toEqual(1);
  });

  it('#session-label contains string "Session Length"', () => {
    const elem = wrapper.find('#session-label');
    expect(elem.text()).toEqual('Session Length');
  });

  it('renders #break-length', () => {
    const elem = wrapper.find('#break-length');
    expect(elem.length).toEqual(1);
  });

  it('#break-length shows value of 5', () => {
    const elem = wrapper.find('#break-length');
    expect(elem.text()).toEqual('5');
  });

  it('renders #session-length', () => {
    const elem = wrapper.find('#session-length');
    expect(elem.length).toEqual(1);
  });

  it('#session-length shows value of 25', () => {
    const elem = wrapper.find('#session-length');
    expect(elem.text()).toEqual('25');
  });

  it('renders #timer-label', () => {
    const elem = wrapper.find('#timer-label');
    expect(elem.length).toEqual(1);
  });

  it('#timer-label contains string "Session"', () => {
    const elem = wrapper.find('#timer-label');
    expect(elem.text()).toEqual('Session');
  });

  it('renders #time-left', () => {
    const elem = wrapper.find('#time-left');
    expect(elem.length).toEqual(1);
  });

  it('the default value in #time-left should be displayed in mm:ss format', () => {
    const elem = wrapper.find('#time-left');
    const timeLeft = elem.text();
    const re = /^\d\d:\d\d$/;
    expect(re.test(timeLeft)).toBeTruthy();
  });

  it('a specific value in #time-left should be displayed in mm:ss format', () => {
    const re = /^\d\d:\d\d$/;
    const minutes = 0;
    const seconds = 1;
    wrapper.instance().setTimerValues(minutes, seconds);
    const elem = wrapper.find('#time-left');
    const timeLeft = elem.text();
    expect(re.test(timeLeft)).toBeTruthy();
  });

  it('renders a clickable element with id="start_stop"', () => {
    const elem = wrapper.find('#start_stop');
    expect(elem.prop('onClick')).toBeFunction();
  });

  it('renders a clickable element with id="reset"', () => {
    const elem = wrapper.find('#reset');
    expect(elem.prop('onClick')).toBeFunction();
  });

  it('has a Control element with id="break"', () => {
    const elem = wrapper.find(Control);
    expect(elem.someWhere(n => n.prop('id') === 'break')).toBeTruthy();
  });

  it('has a Control element with id="session"', () => {
    const elem = wrapper.find(Control);
    expect(elem.someWhere(n => n.prop('id') === 'session')).toBeTruthy();
  });
});
