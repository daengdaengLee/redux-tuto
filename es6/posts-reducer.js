export const ADD = 'posts/ADD';
export const REMOVE = 'posts/REMOVE';

const initState = {
  allPostIds: [],
  postsById: {},
};

export default function postsReducer(state = initState, action = {}) {
  switch (action.type) {
  case ADD:
    return applyAdd(state, action);
  case REMOVE:
    return applyRemove(state, action);
  default:
    return state;
  }
}

function applyAdd(state, { creator, postId, title, content }) {
  if (!creator || !postId || !title || !content) return state;
  if (state.allPostIds.includes(postId)) return state;
  const allPostIds = [...state.allPostIds, postId];
  const postsById = {
    ...state.postsById,
    [postId]: {
      postId,
      creator,
      title,
      content,
    },
  };
  return {
    ...state,
    allPostIds,
    postsById,
  };
}

function applyRemove(state, { postId }) {
  const allPostIds = state.allPostIds.filter(id => id !== postId);
  const { postId: deletedPost, ...postsById } = state.postsById;
  return {
    ...state,
    allPostIds,
    postsById,
  };
}

export const add = (creator, postId, title, content) => ({
  type: ADD,
  creator,
  postId,
  title,
  content,
});

export const remove = postId => ({
  type: REMOVE,
  postId,
});
