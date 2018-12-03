(function(g) {
  var reduxMiddlewares = {};

  var loggerMiddleware = function(store) {
    return function(next) {
      return function(action) {
        console.log('[REDUX LOGGER] Action dispatched', action);
        console.log('[REDUX LOGGER] State before dispatch', store.getState());
        var result = next(action);
        console.log('[REDUX LOGGER] State after dispatch', store.getState());
        return result;
      };
    };
  };

  var authMiddleware = function(store) {
    return function(next) {
      return function(action) {
        if (action.type === g.reducers.users.SIGNIN_START) {
          console.log('[REDUX AUTH] Signin request : ', action.username);
          setTimeout(function() {
            console.log('[REDUX AUTH] Signin success : ', action.username);
            store.dispatch(g.reducers.users.signinSuccess(action.username));
          }, 3000);
        }
        return next(action);
      };
    };
  };

  reduxMiddlewares.logger = loggerMiddleware;
  reduxMiddlewares.auth = authMiddleware;

  g.reduxMiddlewares = reduxMiddlewares;
})(window);
