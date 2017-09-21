import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TodoItem from '../../src/components/TodoItem';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('TodoItem', () => {
  it('renders an item', () => {
    const text = 'React';
    const component = renderIntoDocument(
      <TodoItem text={text} />
    );
    const todo = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(todo.length).to.equal(1);
    expect(todo[0].textContent).to.contain('React');
  });

  it('strikes through the item if it is completed', () => {
    const text = 'React';
    const component = renderIntoDocument(
      <TodoItem text={text} isCompleted={true} />
    );
    const todo = scryRenderedDOMComponentsWithTag(component, 'li');

    expect(todo[0].classList.contains('completed')).to.equal(true);
  });

  it('should be checked if the item is completed', () => {
    const text = 'React';
    const text2 = 'Redux';
    const component = renderIntoDocument(
      <TodoItem text={text} isCompleted={true} />
    );
    const input = scryRenderedDOMComponentsWithTag(component, 'input');
    expect(input[0].checked).to.equal(true);

    const component2 = renderIntoDocument(
      <TodoItem text={text2} isCompleted={false} />
    );
    const input2 = scryRenderedDOMComponentsWithTag(component2, 'input');
    expect(input2[0].checked).to.equal(false);
  });

  it('invokes a callback when checkbox is clicked', () => {
    const text = 'React';
    var isChecked = false;
    const toggleComplete = () => isChecked = true;
    const component = renderIntoDocument(
      <TodoItem text={text} toggleComplete={toggleComplete} />
    );
    const checkboxes = scryRenderedDOMComponentsWithTag(component, 'input');
    Simulate.click(checkboxes[0]);

    expect(isChecked).to.equal(true);
  })
});
