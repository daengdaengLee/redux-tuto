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

  redux.createStore = createStore;
  g.redux = redux;
})(window);
