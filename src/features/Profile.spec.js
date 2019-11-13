import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from './Profile';

describe('Profile', () => {
  it('should render Profile correctly with no skills', () => {
    const component = shallow(
      <Profile
        getData={jest.fn()}
        setLocation={jest.fn()}
        skills={[]}
        location={''}
        loading={false}
        auth={{}}
        setLoading={jest.fn()}
        profile={{}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
