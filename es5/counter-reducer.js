(function(g) {
  var counters = {};

  var INCREMENT = 'counters/INCREMENT';
  var DECREMENT = 'counters/DECREMENT';

  var reducer = function(state, action) {
    switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { num: state.num + 1 });
    case DECREMENT:
      return Object.assign({}, state, { num: state.num - 1 });
    default:
      return state;
    }
  };

  var increment = function() {
    return { type: INCREMENT };
  };
  var decrement = function() {
    return { type: DECREMENT };
  };

  counters.reducer = reducer;
  counters.increment = increment;
  counters.decrement = decrement;

  g.reducers || (g.reducers = {});
  g.reducers.counters = counters;
})(window);
