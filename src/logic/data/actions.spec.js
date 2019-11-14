import * as actions from './actions'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'SET_PROFILE',
      data
    };
    expect(actions.setProfile(data)).toEqual(expectedAction)
  })
});

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'SET_QUEST',
      data
    };
    expect(actions.setQuest(data)).toEqual(expectedAction)
  })
});

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'SET_SKILLS',
      data
    };
    expect(actions.setSkills(data)).toEqual(expectedAction)
  })
});

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'GET_DATA',
      data
    };
    expect(actions.setData(data)).toEqual(expectedAction)
  })
});

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'SET_ATTRIBUTES',
      data
    };
    expect(actions.setAttributes(data)).toEqual(expectedAction)
  })
});

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'SET_QUESTS',
      data
    };
    expect(actions.setQuests(data)).toEqual(expectedAction)
  })
});

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const data = {};
    const expectedAction = {
      type: 'SET_USER',
      data
    };
    expect(actions.setUser(data)).toEqual(expectedAction)
  })
});
