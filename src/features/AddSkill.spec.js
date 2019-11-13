import React from 'react';
import { shallow } from 'enzyme';
import { AddSkill } from './AddSkill';

describe('AddSkill', () => {
  it('should render AddSkill correctly with no location', () => {
    const component = shallow(
      <AddSkill
        skills={[]} setLocation={jest.fn()} location={""} handleSubmit={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
