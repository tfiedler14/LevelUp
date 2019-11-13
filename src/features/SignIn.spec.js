import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from './SignIn';

describe('SignIn', () => {
  const quests = [
    {
      description: 'test',
      expVal: 10,
      name: 'testing',
      skill: 'jest'
    },
    {
      description: 'atest',
      expVal: 10,
      name: 'testingstuff',
      skill: 'enzyme'
    }
  ];

  it('should render sign in correctly', () => {
    const component = shallow(
      <SignIn
        setLocation={jest.fn()}
        handleSubmit={jest.fn()}
        setAuthentication={jest.fn()}
        initialize={jest.fn()}
        setErrors={jest.fn()}
        errors={[]}
        values={[]}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
