import { createStore, combineReducers, applyMiddleware } from './redux';
import loggerMiddleware from './logger-middleware';
import authMiddleware from './auth-middleware';
import posts, { add, remove } from './posts-reducer';
import users, { signinStart, signout } from './users-reducer';

const rootReducer = combineReducers({ posts, users });
const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, authMiddleware),
);

// get DOM elements
const usernameEl = document.querySelector('.auth .username');
const signinEl = document.querySelector('.auth .sign_in');
const singoutEl = document.querySelector('.auth .sign_out');

const titleEl = document.querySelector('.editor .title');
const contentEl = document.querySelector('.editor .content');
const addEl = document.querySelector('.editor .add');

const listEl = document.querySelector('.list');

// make event listener functions
const onClickSignIn = () => {
  var username = usernameEl.value.trim();
  if (!username) return alert('Please input username!');
  store.dispatch(signinStart(username));
};

const onClickSignOut = () => store.dispatch(signout());

const onClickAdd = () => {
  const username = store.getState().users.username;
  const postId = Date.now().toString();
  const title = titleEl.value.trim();
  const content = contentEl.value.trim();
  if (!username) return alert('Sign in first!');
  if (!title || !content) return alert('Please input title and content');
  store.dispatch(add(username, postId, title, content));
};

const onClickRemove = ({
  target: {
    dataset: { postId },
  },
}) => {
  const username = store.getState().users.username;
  const postsById = store.getState().posts.postsById;
  const post = postsById[postId];
  if (username !== post.creator)
    return alert("Cannot delete other user's post!");
  store.dispatch(remove(postId));
};

// make render function
const renderUsername = () =>
  (usernameEl.value = store.getState().users.username);

const renderEditor = () => {
  const disabled = !store.getState().users.username;
  addEl.disabled = disabled;
  titleEl.disabled = disabled;
  contentEl.disabled = disabled;
};

const renderList = function() {
  listEl.innerHTML = '';

  const posts = store.getState().posts;
  const allPostIds = posts.allPostIds;
  const postsById = posts.postsById;
  allPostIds.forEach(postId => {
    const post = postsById[postId];
    const templete = `
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
    const parent = document.createElement('div');
    parent.innerHTML = templete;
    const liEl = parent.children[0];
    const removeEl = liEl.querySelector('.remove');
    removeEl.addEventListener('click', onClickRemove);
    listEl.appendChild(liEl);
  });
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
