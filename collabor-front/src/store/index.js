import { configureStore } from '@reduxjs/toolkit';
import ideaListReducer from '../features/ideas/idea-list.slice';
import ideaReducer from '../features/ideas/idea.slice';
import loginReducer from '../features/auth/login.slice';
import ideaNewReducer from '../features/ideas/idea-new.slice';
import ideaDeleteReducer from '../features/ideas/idea-delete.slice'
import registerReducer from '../features/auth/register.slice';
import userListReducer from '../features/users/user-list.slice';
import userReducer from '../features/users/user.slice';

const store = configureStore({
  reducer: {
    ideaList: ideaListReducer,
    idea: ideaReducer,
    login: loginReducer,
    register: registerReducer,
    ideaNew: ideaNewReducer,
    ideaDelete: ideaDeleteReducer,
    userList: userListReducer,
    user: userReducer,
  },
  devTools: true,
});

export default store;
