import { SIGNIN_START, signinSuccess } from './users-reducer';

export default store => next => action => {
  if (action.type === SIGNIN_START) {
    console.log('[REDUX AUTH] Signin request : ', action.username);
    setTimeout(function() {
      console.log('[REDUX AUTH] Signin success : ', action.username);
      store.dispatch(signinSuccess(action.username));
    }, 3000);
  }
  return next(action);
};
