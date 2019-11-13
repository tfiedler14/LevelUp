import React from 'react';
import { shallow } from 'enzyme';
import { AddQuest } from './AddQuest';

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
