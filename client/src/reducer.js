import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function toggleComplete(state, itemId) {
  // get index of item w/ itemId
  const itemIndex = state.get('todos').findIndex(
    (item) => item.get('id') === itemId
  );

  // update item's status to the inverse
  const updatedItem = state.get('todos')
                           .get(itemIndex)
                           .update('status', status => status === 'active' ? 'completed' : 'active');

  // update the todos store and set the item
  return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_COMPLETE':
      return toggleComplete(state, action.itemId);
  }
  return state;
}
