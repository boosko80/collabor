// == Import npm
import React from 'react';

// == Import
import 'bootstrap/dist/css/bootstrap.css';

// == Custom components
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../Page/Home';
import IdeaList from '../Page/IdeaList';
import Idea from '../Page/Idea';
import NewIdea from '../Page/NewIdea';
import Register from '../Page/Register';
import UserList from '../Page/UserList';
import User from '../Page/User';

// == Composant
const App = () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/users" exact>
        <UserList />
      </Route>
      <Route path="/users/:id">
        <User />
      </Route>
      <Route path="/ideas/new" exact>
        <NewIdea />
      </Route>
      <Route path="/ideas" exact>
        <IdeaList />
      </Route>
      <Route path="/ideas/:id">
        <Idea />
      </Route>
    </Switch>
  </HashRouter>
);

// == Export
export default App;
