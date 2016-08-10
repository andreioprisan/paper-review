import '../jsdom';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import mock from 'mock-require';

describe('<Question />', () => {
  mock('../../src/components/questions.css', {});

  var props = {
    id: 1,
    text: 'wth?',
    question_type: 'text'
  };

  it('should be able to fill in the input', (done) => {
    const Question = require('../../src/components/Question');

    props = {
      ...props,
      onChange: (id, value) => {
        done()
      }
    }
    const wrapper = mount(<Question {...props} />);

    const textarea = wrapper.find('textarea');
    textarea.simulate('change', { target: { value: 'Hello' } });
  });

});
