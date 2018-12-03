(function(g) {
  var users = {};

  var SIGNIN_START = 'users/SIGNIN_START';
  var SIGNIN_SUCCESS = 'users/SIGNIN_SUCCESS';
  var SIGNOUT = 'users/SIGNOUT';

  var reducer = function(state, action) {
    switch (action.type) {
    case SIGNIN_SUCCESS:
      return Object.assign({}, state, { username: action.username });
    case SIGNOUT:
      return Object.assign({}, state, { username: null });
    default:
      return state;
    }
  };

  var signinStart = function(username) {
    return {
      type: SIGNIN_START,
      username: username,
    };
  };
  var signinSuccess = function(username) {
    return {
      type: SIGNIN_SUCCESS,
      username: username,
    };
  };
  var signout = function() {
    return {
      type: SIGNOUT,
    };
  };

  users.reducer = reducer;
  users.SIGNIN_START = SIGNIN_START;
  users.signinStart = signinStart;
  users.signinSuccess = signinSuccess;
  users.signout = signout;

  g.reducers || (g.reducers = {});
  g.reducers.users = users;
})(window);
