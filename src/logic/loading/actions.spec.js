import * as actions from './actions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const loading = false;
    const expectedAction = {
      type: 'SET_LOADING',
      loading
    };
    expect(actions.setLoading(loading)).toEqual(expectedAction)
  })
});