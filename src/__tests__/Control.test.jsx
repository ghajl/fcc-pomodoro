import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';
import Control from '../Control';

describe('Control with id="break"', () => {
  const num = 1;
  const wrapper = shallow(
    <Control
      id="break"
      label="Break Length"
      onIncrementClick={() => {}}
      onDecrementClick={() => {}}
    >
      {num}
    </Control>,
  );
  it('renders an element with id="break-label", that contains string "Break Length"', () => {
    const elem = wrapper.find('#break-label');
    expect(elem.length).toEqual(1);
    expect(elem.text()).toEqual('Break Length');
  });

  it('renders an element with id="break-length"', () => {
    const elem = wrapper.find('#break-length');
    expect(elem.length).toEqual(1);
  });

  it('renders a clickable element with id="break-decrement"', () => {
    const elem = wrapper.find('#break-decrement');
    expect(elem.prop('onClick')).toBeFunction();
  });

  it('renders a clickable element with id="break-increment"', () => {
    const elem = wrapper.find('#break-increment');
    expect(elem.prop('onClick')).toBeFunction();
  });
});

describe('Control with id="session"', () => {
  const num = 1;
  const wrapper = shallow(
    <Control
      id="session"
      label="Session Length"
      onIncrementClick={() => {}}
      onDecrementClick={() => {}}
    >
      {num}
    </Control>,
  );
  it('renders an element with id="session-label", that contains string "Session Length"', () => {
    const elem = wrapper.find('#session-label');
    expect(elem.length).toEqual(1);
    expect(elem.text()).toEqual('Session Length');
  });

  it('renders an element with id="session-length"', () => {
    const elem = wrapper.find('#session-length');
    expect(elem.length).toEqual(1);
  });

  it('renders a clickable element with id="session-decrement"', () => {
    const elem = wrapper.find('#session-decrement');
    expect(elem.prop('onClick')).toBeFunction();
  });

  it('renders a clickable element with id="session-increment"', () => {
    const elem = wrapper.find('#session-increment');
    expect(elem.prop('onClick')).toBeFunction();
  });
});
