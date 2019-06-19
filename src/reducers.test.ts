import reducer from './reducers';
import { deleteMessage, submitMessage } from './actions';

describe('Reducers', () => {
  it('Creates an initial state', () => {
    const state = reducer();
    expect(state).toEqual({messages:[]});
  });

  it('Deletes first message', () => {
    const msg = 'hello';
    const anotherMsg = 'goodbye';
    const init = reducer();
    const after = reducer(init, submitMessage(msg));
    const afterAnother = reducer(after, submitMessage(anotherMsg));
    const afterDelete = reducer(afterAnother, deleteMessage(1));

    expect(init).toEqual({messages:[]});
    expect(after).toEqual({messages:[msg]});
    expect(afterAnother).toEqual({messages:[anotherMsg, msg]});
    expect(afterDelete).toEqual({messages:[anotherMsg]});
  });

  it('Deletes second message', () => {
    const msg = 'hello';
    const anotherMsg = 'goodbye';
    const init = reducer();
    const after = reducer(init, submitMessage(msg));
    const afterAnother = reducer(after, submitMessage(anotherMsg));
    const afterDelete = reducer(afterAnother, deleteMessage(0));

    expect(init).toEqual({messages:[]});
    expect(after).toEqual({messages:[msg]});
    expect(afterAnother).toEqual({messages:[anotherMsg, msg]});
    expect(afterDelete).toEqual({messages:[msg]});
  });

  it('Ignores spurios deletes', () => {
    const init = reducer();
    const after = reducer(init, deleteMessage(1));

    expect(init).toEqual({messages:[]});
    expect(after).toEqual({messages:[]});
  });


  it('Submits a message', () => {
    const msg = 'hello';
    const anotherMsg = 'goodbye';
    const init = reducer();
    const after = reducer(init, submitMessage(msg));
    const afterAnother = reducer(after, submitMessage(anotherMsg));

    expect(init).toEqual({messages:[]});
    expect(after).toEqual({messages:[msg]});
    expect(afterAnother).toEqual({messages:[anotherMsg, msg]});
  });
});
