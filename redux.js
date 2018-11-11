(function(g) {
  var redux = {};

  var createStore = function(reducer, initState) {
    var state = initState || reducer(null, {});
    var listeners = [];

    var getState = function() {
      return state;
    };
    var dispatch = function(action) {
      state = reducer(state, action);
      var len = listeners.length;
      for (var i = 0; i < len; i++) {
        var listener = listeners[i];
        listener();
      }
    };
    var subscribe = function(listener) {
      return listeners.push(listener);
    };

    return {
      getState,
      dispatch,
      subscribe,
    };
  };

  var combineReducers = function(reducers) {
    var rootReducer = function(state, action) {
      var newState = {};
      var subReducerNames = Object.keys(state);
      var len = subReducerNames.length;
      for (var i = 0; i < len; i++) {
        var subReducerName = subReducerNames[i];
        var subReducer = reducers[subReducerName];
        var oldSubState = state[subReducerName];
        var newSubState = subReducer(oldSubState, action);
        newState[subReducerName] = newSubState;
      }
      return newState;
    };
    return rootReducer;
  };

  redux.createStore = createStore;
  redux.combineReducers = combineReducers;
  g.redux = redux;
})(window);
