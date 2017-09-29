import Axios from 'axios';

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
        alert("Network failure. \nPlease check that the server is running on http://localhost:5000");
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

export function toggleCompleteSuccess(itemId) {
  return {
    type: 'TOGGLE_COMPLETE',
    itemId
  }
}

export const toggleComplete = (itemId) => {
  const new_apiUrl = apiUrl.concat(String(itemId))
  return (dispatch) => {
    return Axios.put(new_apiUrl)
      .then(response => {
        if (response.status == 200) {
          dispatch(toggleCompleteSuccess(itemId))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function markAllAsCompletedSuccess() {
  return {
    type: 'MARK_ALL_COMPLETED'
  }
}

export const markAllAsCompleted = () => {
  const new_apiUrl = apiUrl.concat("complete")
  return (dispatch) => {
    return Axios.put(new_apiUrl)
      .then(response => {
        if (response.status == 200) {
          dispatch(markAllAsCompletedSuccess())
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};

export function reorderItemSuccess(updated_todos) {
  return {
    type: 'REORDER_ITEM',
    updated_todos
  }
}

export const reorderItem = (itemId, oldIndex, newIndex) => {
  const new_apiUrl = apiUrl.concat(String(itemId)).concat("/reorder");
  return (dispatch) => {
    return Axios.put(new_apiUrl, {'new_position': newIndex})
      .then(response => {
        if (response.status == 200) {
          dispatch(reorderItemSuccess(response.data, itemId, oldIndex, newIndex))
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};
