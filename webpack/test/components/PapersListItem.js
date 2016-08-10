import React from 'react';
import PapersListItem from '../../src/components/PapersListItem';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('<PapersListItem />', () => {

  var props = {
    name: 'name',
    id: 1,
    finished: false,
    user_reviewed: false
  };

  it('should show waiting when there are no reviews yet', () => {
    const wrapper = shallow(<PapersListItem {...props} />);
    expect(wrapper.find('li').last().text()).to.contain('Waiting for reviews');
  });

});
