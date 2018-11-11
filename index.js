(function(g) {
  // import modules
  var redux = g.redux;
  var reducers = g.reducers;

  var createStore = redux.createStore;
  var counters = reducers.counters;
  var counterReducer = counters.reducer;
  var increment = counters.increment;
  var decrement = counters.decrement;

  // create redux store
  var initState = { num: 0 };
  var store = createStore(counterReducer, initState);

  // get DOM elements
  var plusButtonEl = document.querySelector('.buttons .plus');
  var minusButtonEl = document.querySelector('.buttons .minus');

  var displayEl = document.querySelector('.display');

  // make event listener functions
  var onClickPlusButton = function() {
    store.dispatch(increment());
  };
  var onClickMinusButton = function() {
    store.dispatch(decrement());
  };

  // make render function
  var render = function() {
    var state = store.getState();
    displayEl.textContent = state.num;
  };

  // subscribe events
  plusButtonEl.addEventListener('click', onClickPlusButton);
  minusButtonEl.addEventListener('click', onClickMinusButton);

  // subscribe store update
  store.subscribe(render);

  // initial rendering
  render();
})(window);
