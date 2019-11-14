import * as actions from './actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const errors = {};
    const expectedAction = {
      type: 'SET_ERRORS',
      errors
    };
    expect(actions.setErrors(errors)).toEqual(expectedAction)
  })
});