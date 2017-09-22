export function toggleComplete(itemId) {
  return {
    type: 'TOGGLE_COMPLETE',
    itemId
  }
}

export function markAllAsCompleted() {
  return {
    type: 'MARK_ALL_COMPLETED'
  }
}

export function addItem(text) {
  return {
    type: 'ADD_ITEM',
    text
  }
}
