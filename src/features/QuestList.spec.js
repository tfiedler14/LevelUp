import React from 'react';
import { shallow } from 'enzyme';
import { QuestList } from './QuestList';

describe('QuestList', () => {
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

  it('should render quest list correctly with no quests', () => {
    const component = shallow(<QuestList quests={[]} getData={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });

  it('should render quest list correctly with quests', () => {
    const component = shallow(<QuestList quests={quests} getData={jest.fn()} />);

    expect(component).toMatchSnapshot();
  });
});
