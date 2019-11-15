import React from 'react';
import { shallow } from 'enzyme';
import { mapDispatchToProps, mapStateToProps, QuestComponent } from './QuestComponent';

describe('QuestComponent', () => {
  it('should render QuestComponent correctly', () => {
    const component = shallow(
      <QuestComponent
        setQuest={jest.fn()}
        deleteData={jest.fn()}
        setLocation={jest.fn()}
        info={{}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render QuestComponent correctly when info is null', () => {
    const component = shallow(
      <QuestComponent
        setQuest={jest.fn()}
        deleteData={jest.fn()}
        setLocation={jest.fn()}
        info={null}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should return the correct auth, profile, and initialValues', () => {
    const state = {
      location: 'quest'
    };

    expect(mapStateToProps(state)).toEqual({
      location: 'quest'
    });
  });
});

describe('mapDispatchToProps', () => {
  it('should dispatch setQuest when setQuest is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setQuest({}, 'test');

    expect(dispatch).toHaveBeenCalledWith({ data: {}, type: 'SET_QUEST' });
  });

  it('should dispatch deleteData when deleteData is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.deleteData({}, 'test');

    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should dispatch setLocation when setLocation is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setLocation('home');

    expect(dispatch).toHaveBeenCalledWith({ location: 'home', type: 'SET_LOCATION' });
  });
});
