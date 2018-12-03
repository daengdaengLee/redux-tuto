export default store => next => action => {
  console.log('[REDUX LOGGER] Action dispatched', action);
  console.log('[REDUX LOGGER] State before dispatch', store.getState());
  const result = next(action);
  console.log('[REDUX LOGGER] State after dispatch', store.getState());
  return result;
};
