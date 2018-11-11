(function(g) {
  var users = {};

  var SIGNIN = 'users/SIGNIN';
  var SIGNOUT = 'users/SIGNOUT';

  var reducer = function(state, action) {
    switch (action.type) {
    case SIGNIN:
      return !action.username
        ? state
        : Object.assign({}, state, { username: action.username });
    case SIGNOUT:
      return Object.assign({}, state, { username: null });
    default:
      return state;
    }
  };

  var signin = function(username) {
    return {
      type: SIGNIN,
      username: username,
    };
  };
  var signout = function() {
    return {
      type: SIGNOUT,
    };
  };

  users.reducer = reducer;
  users.signin = signin;
  users.signout = signout;

  g.reducers || (g.reducers = {});
  g.reducers.users = users;
})(window);
