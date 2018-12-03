(function(g) {
  // import modules
  var redux = g.redux;
  var reducers = g.reducers;
  var reduxMiddlewares = g.reduxMiddlewares;

  var createStore = redux.createStore;
  var combineReducers = redux.combineReducers;
  var applyMiddleware = redux.applyMiddleware;
  var users = reducers.users;
  var usersReducer = users.reducer;
  var signinStart = users.signinStart;
  var signout = users.signout;
  var posts = reducers.posts;
  var postsReducer = posts.reducer;
  var add = posts.add;
  var remove = posts.remove;

  // create redux store
  var initState = {
    users: { username: null },
    posts: { postsById: {}, allPostIds: [] },
  };
  var rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
  });
  var store = createStore(
    rootReducer,
    initState,
    applyMiddleware(reduxMiddlewares.logger, reduxMiddlewares.auth),
  );

  // get DOM elements
  var usernameEl = document.querySelector('.auth .username');
  var signinEl = document.querySelector('.auth .sign_in');
  var singoutEl = document.querySelector('.auth .sign_out');

  var titleEl = document.querySelector('.editor .title');
  var contentEl = document.querySelector('.editor .content');
  var addEl = document.querySelector('.editor .add');

  var listEl = document.querySelector('.list');

  // make event listener functions
  var onClickSignIn = function() {
    var username = usernameEl.value.trim();
    if (!username) return alert('Please input username!');
    store.dispatch(signinStart(username));
  };

  var onClickSignOut = function() {
    store.dispatch(signout());
  };

  var onClickAdd = function() {
    var username = store.getState().users.username;
    var postId = Date.now().toString();
    var title = titleEl.value.trim();
    var content = contentEl.value.trim();
    if (!username) return alert('Sign in first!');
    if (!title || !content) return alert('Please input title and content');
    store.dispatch(add(username, postId, title, content));
  };

  var onClickRemove = function(event) {
    var username = store.getState().users.username;
    var postsById = store.getState().posts.postsById;
    var postId = event.target.dataset.postId;
    var post = postsById[postId];
    if (username !== post.creator)
      return alert("Cannot delete other user's post!");
    store.dispatch(remove(postId));
  };

  // make render function
  var renderUsername = function() {
    var username = store.getState().users.username;
    usernameEl.value = username;
  };

  var renderEditor = function() {
    var username = store.getState().users.username;
    if (username) {
      addEl.disabled = false;
      titleEl.disabled = false;
      contentEl.disabled = false;
    } else {
      addEl.disabled = true;
      titleEl.disabled = true;
      contentEl.disabled = true;
    }
  };

  var renderList = function() {
    listEl.innerHTML = '';

    var posts = store.getState().posts;
    var allPostIds = posts.allPostIds;
    var postsById = posts.postsById;
    var len = allPostIds.length;
    for (var i = 0; i < len; i++) {
      var postId = allPostIds[i];
      var post = postsById[postId];
      var templete = `
        <li>
          <button type="button" class="remove" data-post-id="${postId}">Remove</button>
          <div>
            Title : ${post.title}
          </div>
          <div>
            Creator : ${post.creator}
          </div>
          <div>
            Content :
            <p>
              ${post.content}
            </p>
          </div>
        </li>
      `;
      var parent = document.createElement('div');
      parent.innerHTML = templete;
      var liEl = parent.children[0];
      var removeEl = liEl.querySelector('.remove');
      removeEl.addEventListener('click', onClickRemove);
      listEl.appendChild(liEl);
    }
  };

  // subscribe events
  signinEl.addEventListener('click', onClickSignIn);
  singoutEl.addEventListener('click', onClickSignOut);
  addEl.addEventListener('click', onClickAdd);

  // subscribe store update
  store.subscribe(renderUsername);
  store.subscribe(renderEditor);
  store.subscribe(renderList);

  // initial rendering
  renderUsername();
  renderEditor();
  renderList();
})(window);
