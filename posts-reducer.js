(function(g) {
  var posts = {};

  var ADD = 'posts/ADD';
  var REMOVE = 'posts/REMOVE';

  var reducer = function(state, action) {
    switch (action.type) {
    case ADD:
      return applyAdd(state, action);
    case REMOVE:
      return applyRemove(state, action);
    default:
      return state;
    }
  };
  function applyAdd(state, action) {
    var postId = action.postId;
    var creator = action.creator;
    var title = action.title;
    var content = action.title;

    if (!creator || !title || !content) return state;

    var isDuplicate = state.allPostIds.includes(postId);
    if (isDuplicate) return state;

    var newPostsById = {};
    newPostsById[postId] = {
      postId: postId,
      creator: creator,
      title: title,
      content: content,
    };
    return Object.assign({}, state, {
      allPostIds: state.allPostIds.concat(postId),
      postsById: Object.assign({}, state.postsById, newPostsById),
    });
  }
  function applyRemove(state, action) {
    const postId = action.postId;

    var allPostIds = state.allPostIds.filter(function(id) {
      return id !== postId;
    });
    var postsById = Object.assign({}, state.postsById);
    delete postsById[postId];

    return Object.assign({}, state, {
      allPostIds: allPostIds,
      postsById: postsById,
    });
  }

  var add = function(creator, postId, title, content) {
    return {
      type: ADD,
      creator: creator,
      postId: postId,
      title: title,
      content: content,
    };
  };
  var remove = function(postId) {
    return {
      type: REMOVE,
      postId: postId,
    };
  };

  posts.reducer = reducer;
  posts.add = add;
  posts.remove = remove;

  g.reducers || (g.reducers = {});
  g.reducers.posts = posts;
})(window);
