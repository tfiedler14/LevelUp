import * as actions from './actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const auth = {};
    const expectedAction = {
      type: 'SET_AUTH',
      auth
    };
    expect(actions.setAuth(auth)).toEqual(expectedAction)
  })
});