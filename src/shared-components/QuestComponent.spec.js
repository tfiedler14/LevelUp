import React from 'react';
import { shallow } from 'enzyme';
import { QuestComponent } from './QuestComponent';

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
});
