import Axios from 'axios';

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

const apiUrl = 'http://localhost:5000/api/v1/todo/';
// Sync Action
export const fetchAllSuccess = (todos) => {
  return {
    type: 'SET_STATE',
    todos
  }
};
//Async Action
export const fetchAll = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get(apiUrl)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(fetchAllSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function addItemSuccess(item) {
  return {
    type: 'ADD_ITEM',
    item
  }
}

export const addItem = (text) => {
  return (dispatch) => {
    return Axios.post(apiUrl, {'text':text})
      .then(response => {
        dispatch(addItemSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};
