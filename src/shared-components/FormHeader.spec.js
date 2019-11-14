import React from 'react';
import { shallow } from 'enzyme';
import { FormHeader } from './FormHeader';

describe('FormHeader', () => {
  it('should render FormHeader correctly', () => {
    const component = shallow(<FormHeader title={""} />);

    expect(component).toMatchSnapshot();
  });
});
