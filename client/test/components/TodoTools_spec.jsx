import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoTools from '../../src/components/TodoTools';
import {expect} from 'chai';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('TodoTools', () => {
  it('displays the number of items left', () => {
    const nbActiveItems = 3;
    const component = renderIntoDocument(
      <TodoTools nbActiveItems={nbActiveItems} />
    );
    const tools = scryRenderedDOMComponentsWithTag(component, 'footer');

    expect(tools[0].textContent).to.contain('3');
  });

  it('calls a callback when the user clicks on the Mark all as Completed button', () => {
    var allCompleted = false;
    const markCompleted = () => allCompleted = true;
    const component = renderIntoDocument(
      <TodoTools markAllAsCompleted={markCompleted} />
    );
    const markAllAsCompletedButton = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(markAllAsCompletedButton[0]);

    expect(allCompleted).to.equal(true);
  });
});
