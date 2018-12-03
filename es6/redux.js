const createStore = (reducer, initState) => {
  let state = initState || reducer(undefined, {});
  const subscribers = [];

  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
    return action;
  };
  const subscribe = subscriber => subscribers.push(subscriber);

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const createStoreWithEnhancer = (reducer, initState, enhancer) => {
  if (typeof reducer !== 'function')
    throw new Error('Fail to create redux store. Reducer should be a function');
  if (typeof initState === 'function') {
    return initState(createStore)(reducer, undefined);
  }
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initState);
  }
  return createStore(reducer, initState);
};

const combineReducers = reducers => (state, action) => {
  const newState = {};
  if (!state) {
    Object.keys(reducers).forEach(sub => {
      const reducer = reducers[sub];
      newState[sub] = reducer(undefined, action);
    });
  } else {
    Object.keys(state).forEach(sub => {
      const reducer = reducers[sub];
      newState[sub] = reducer(state[sub], action);
    });
  }
  return newState;
};

const applyMiddleware = (...middlewares) => createStore => (
  reducer,
  initState,
) => {
  const store = createStore(reducer, initState);
  let dispatch = () => {
    throw new Error('Cannot dispatch action before init redux store');
  };
  const middlewareAPI = {
    getState: store.getState,
    dispatch: (...args) => dispatch(...args),
  };
  const chain = middlewares.map(middleware => middleware(middlewareAPI));

  if (chain.length === 0) {
    dispatch = store.dispatch;
  } else if (chain.length === 1) {
    dispatch = chain[0](store.dispatch);
  } else {
    /*
    [f1, f2, f3, f4]

    (...args) => f1(f2(...args))
    f1(f2(store.dispatch))

    (...args2) => ((...args1) => f1(f2(...args1)))(f3(...args2))
    (...args2) => f1(f2(f3(...args2)))
    f1(f2(f3(store.dispatch)))

    (...args2) => ((...args) => f1(f2(f3(...args))))(f4(...args2))
    (...args2) => f1(f2(f3(f4(...args2))))
    f1(f2(f3(f4(store.dispatch))))

    action
    -> f1
    -> f2
    -> f3
    -> f4
    -> store.dispatch
    */
    dispatch = chain.reduce((a, b) => (...args) => a(b(...args)))(
      store.dispatch,
    );
  }

  return {
    ...store,
    dispatch,
  };
};

export {
  createStoreWithEnhancer as createStore,
  combineReducers,
  applyMiddleware,
};
