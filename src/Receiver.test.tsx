import React from 'react';
import { createStore } from 'redux';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Receiver from './Receiver';
import { SimpleReceiver } from './Receiver';
import { Provider } from 'react-redux';

import reducer from './reducers';
import { submitMessage } from './actions';

Enzyme.configure({ adapter: new Adapter() });

function setupMount(
  messages: string[] = [],
  onClickMessage: (i: number) => void = (i) => {})
{
  const props = { messages, onClickMessage };
  const enzymeWrapper = mount(<SimpleReceiver {...props} />);

  return { props, enzymeWrapper };
}

function setupShallow(
  messages: string[] = [],
  onClickMessage: (i: number) => void = (i) => {})
{
  const props = { messages, onClickMessage };
  const enzymeWrapper = shallow(<SimpleReceiver {...props} />);

  return { props, enzymeWrapper };
}

describe('Receiver component', () => {
  it('wires deletes a message', () => {
    let clicked = -1;
    const { enzymeWrapper } = setupMount(
      ['first thing', 'second thing'],
      i => { clicked = i; }
    );
    expect(clicked).toBe(-1);

    expect(enzymeWrapper.find('button').length).toBe(2);

    enzymeWrapper.find('button').at(1).simulate('click');
    expect(clicked).toBe(1);

    enzymeWrapper.find('button').at(0).simulate('click');
    expect(clicked).toBe(0);
  });

  it('wires dispatch', () => {
    const store = createStore(reducer);

    const messages = ['first', 'second'];
    messages.forEach(i =>
      store.dispatch(submitMessage(i)));

    const wrapper = mount(
      <Provider store={store}>
        <Receiver/>
      </Provider>
    );

    expect(store.getState().messages.length).toBe(2);
    wrapper.find('button').at(1).simulate('click');
    expect(store.getState().messages.length).toBe(1);
  });

  it('renders empty without messages', () => {
    const { enzymeWrapper } = setupShallow();
    expect(enzymeWrapper.text()).toEqual('');
  });

  it('renders pair of messages', () => {
    const { enzymeWrapper } = setupShallow(['first thing', 'second thing']);
    expect(enzymeWrapper.text()).toEqual('first thingsecond thing');
  });
});
