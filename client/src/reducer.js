import {Map} from 'immutable';

function findItemIndex(state, itemId) {
  return state.get('todos').findIndex(
    (item) => item.get('id') === itemId
  );
}

function setState(state, todos) {
  return state.merge({
    todos: todos,
    filter: 'all'
  });
}

function toggleComplete(state, item) {
  // get index of item w/ itemId
  const itemIndex = findItemIndex(state, item['id']);

  // update item's status to the inverse
  const updatedItem = state.get('todos')
                           .get(itemIndex)
                           .update('status', status => item['status']);

  // update the todos store and set the item
  return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function markAllAsCompleted(state) {
  return state.update(
    'todos',
    todos => todos.map(item => item.update(
      'status',
      status => 'completed'
    ))
  );
}

function addItem(state, item) {
  const newItem = Map({id: item['id'], text: item['text'], status: item['status']});
  return state.update('todos', (todos) => todos.push(newItem));
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.todos);
    case 'TOGGLE_COMPLETE':
      return toggleComplete(state, action.item);
    case 'MARK_ALL_COMPLETED':
      return markAllAsCompleted(state);
    case 'ADD_ITEM':
      return addItem(state, action.item);
  }
  return state;
}
