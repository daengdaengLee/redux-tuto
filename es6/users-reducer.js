export const SIGNIN_START = 'users/SIGNIN_START';
export const SIGNIN_SUCCESS = 'users/SIGNIN_SUCCESS';
export const SIGNOUT = 'users/SIGNOUT';

const initState = {
  username: null,
};

export default function usersReducer(state = initState, action = {}) {
  switch (action.type) {
  case SIGNIN_SUCCESS:
    return applySigninSuccess(state, action);
  case SIGNOUT:
    return applySignout(state, action);
  default:
    return state;
  }
}

function applySigninSuccess(state, { username }) {
  return {
    ...state,
    username,
  };
}

function applySignout(state) {
  return {
    ...state,
    username: null,
  };
}

export const signinStart = username => ({
  type: SIGNIN_START,
  username,
});

export const signinSuccess = username => ({
  type: SIGNIN_SUCCESS,
  username,
});

export const signout = () => ({
  type: SIGNOUT,
});
