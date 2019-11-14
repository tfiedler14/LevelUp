import React from 'react';
import { shallow } from 'enzyme';
import { WrappedTextInput } from './FormField';

describe('FormField', () => {
  it('should render FormField correctly', () => {
    const props = {
      title: 'test',
      input: {},
      textContentType: 'any',
      autoCompleteType: 'any',
      password: false,
      multiline: false,
      meta: {}
    };

    const component = shallow(<WrappedTextInput {...props} />);

    expect(component).toMatchSnapshot();
  });
});
