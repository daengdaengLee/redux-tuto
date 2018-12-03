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

  var createStoreWithMiddleware = function(reducer, initState, enhancer) {
    if (arguments.length === 2) {
      return createStore(reducer, initState);
    }
    return enhancer(createStore)(reducer, initState);
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

  var applyMiddleware = function(/* middlewares */) {
    var middlewares = Array.prototype.slice.call(arguments).reverse();
    return function(createStore) {
      return function(reducer, initState) {
        var store = createStore(reducer, initState);
        var dispatch = function() {
          throw new Error('Redux middleware error');
        };
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function() {
            return dispatch.apply(null, arguments);
          },
        };
        var len = middlewares.length;
        if (len) {
          dispatch = middlewares[0](middlewareAPI)(store.dispatch);
          for (var i = 1; i < len; i++) {
            var middleware = middlewares[i];
            dispatch = middleware(middlewareAPI)(dispatch);
          }
        }
        return {
          getState: store.getState,
          dispatch: dispatch,
          subscribe: store.subscribe,
        };
      };
    };
  };

  redux.createStore = createStoreWithMiddleware;
  redux.combineReducers = combineReducers;
  redux.applyMiddleware = applyMiddleware;
  g.redux = redux;
})(window);
