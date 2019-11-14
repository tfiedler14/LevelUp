import * as actions from './actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const location = false;
    const expectedAction = {
      type: 'SET_LOCATION',
      location
    };
    expect(actions.setLocation(location)).toEqual(expectedAction)
  })
});