import React from 'react';
import { shallow } from 'enzyme';
import { AddQuest, mapDispatchToProps, mapStateToProps, validate } from './AddQuest';

describe('AddQuest', () => {
  it('should render AddQuest correctly with no auth', () => {
    const component = shallow(
      <AddQuest
        editProp={jest.fn()}
        getData={jest.fn()}
        putData={jest.fn()}
        setLocation={jest.fn()}
        auth={{}}
        handleSubmit={jest.fn()}
        profile={{}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should return the correct auth, profile, and initialValues', () => {
    const state = {
      auth: {
        test: 'authorized'
      },
      data: {
        profile: {
          name: 'test user'
        },
        quest: {
          test: 'test'
        }
      }
    };

    expect(mapStateToProps(state, { editProp: false })).toEqual({
      auth: {
        test: 'authorized'
      },
      profile: {
        name: 'test user'
      },
      initialValues: { image: 'https://equalrightscenter.org/wp-content/uploads/quest-icon-1.png' }
    });
  });
});

describe('mapDispatchToProps', () => {
  it('should dispatch putData when putData is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.putData('/', {}, '');

    // This dispatch test doesn't feel very meaningful, but it shows that
    // mapDispatchToProps is correctly executing SOME function.
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should dispatch getData when getData is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.getData({}, 'test');

    // This dispatch test doesn't feel very meaningful, but it shows that
    // mapDispatchToProps is correctly executing SOME function.
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should dispatch setLocation when setLocation is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setLocation('home');

    expect(dispatch).toHaveBeenCalledWith({"location": "home", "type": "SET_LOCATION"});
  });
});

describe('validatorTest', () => {
  const dummyValues = {
    name: 'name test',
    description: 'desc test'
  };

  it('should validate name is required', () => {
    expect(validate({ ...dummyValues, name: null })).toEqual({
      name: 'Required'
    });
  });

  it('should validate name is less than 20 characters', () => {
    expect(
      validate({ ...dummyValues, name: 'the quick brown fox jumps over the lazy dog' })
    ).toEqual({
      name: 'Must be twenty characters or less'
    });
  });

  it('should validate description is required', () => {
    expect(validate({ ...dummyValues, description: null })).toEqual({
      description: 'Required'
    });
  });

  it('should validate description is less than 500 characters', () => {
    expect(
      validate({
        ...dummyValues,
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus'
      })
    ).toEqual({
      description: 'Must be 500 characters or less'
    });
  });
});
