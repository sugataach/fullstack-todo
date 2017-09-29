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

function toggleComplete(state, itemId) {
  // get index of item w/ itemId
  const itemIndex = findItemIndex(state, itemId);

  // update item's status to the inverse
  const updatedItem = state.get('todos')
                           .get(itemIndex)
                           .update('status', status => status === 'active' ? 'completed' : 'active');

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
  // location.reload();
  return state.update('todos', (todos) => todos.push(newItem));
}

function reorderItem(state, updated_todos, itemId, oldIndex, newIndex) {
  return state.merge({
    todos: updated_todos
  });
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.todos);
    case 'TOGGLE_COMPLETE':
      return toggleComplete(state, action.itemId);
    case 'MARK_ALL_COMPLETED':
      return markAllAsCompleted(state);
    case 'ADD_ITEM':
      return addItem(state, action.item);
    case 'REORDER_ITEM':
      return reorderItem(state, action.updated_todos, action.itemId, action.oldIndex, action.newIndex)
  }
  return state;
}
