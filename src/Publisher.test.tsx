import React from 'react';
import { createStore } from 'redux';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Publisher from './Publisher';
import { SimplePublisher } from './Publisher';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

function setupShallow(
  onSubmitMessage: (msg: string) => void = (msg) => {})
{
  const props = { onSubmitMessage };
  const enzymeWrapper = shallow(<SimplePublisher {...props} />);

  return { props, enzymeWrapper };
}

describe('Publisher component', () => {
  it('renders send button', () => {
    const { enzymeWrapper } = setupShallow();
    expect(enzymeWrapper.text()).toEqual('Send');
  });

  it('wires dispatch', () => {
    const dispatched = [];
    const store = createStore((d) => {
      dispatched.push(d);
    });

    const onSubmitMessage = msg => {};
    const props = { onSubmitMessage };
    const wrapper = mount(
      <Provider store={store}>
        <Publisher {...props} />
      </Provider>
    );

    wrapper.update();
    expect(dispatched.length).toBe(1); // initialize
    wrapper.find('input').simulate('change', { target: { value: 'hello' } });
    wrapper.find('button').simulate('click');
    expect(dispatched.length).toBe(2);

    // check that we clear field and don't send an empty
    wrapper.find('button').simulate('click');
    expect(dispatched.length).toBe(2);
  });
});
