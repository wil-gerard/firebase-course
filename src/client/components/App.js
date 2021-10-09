/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import { Toaster } from 'react-hot-toast';
import Layout from './Layout';
import { UserProvider } from './user-context';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import MyList from '../pages/MyList';
import MyTeam from '../pages/MyTeam';
import NotFound from '../pages/NotFound';

const App = () => (
  <Router>
    <UserProvider>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <PrivateRoute
            path="/my-list"
            component={MyList}
          />

          <PrivateRoute
            path="/my-team"
            component={MyTeam}
          />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
      <Toaster />
    </UserProvider>
  </Router>
);

export default App;
