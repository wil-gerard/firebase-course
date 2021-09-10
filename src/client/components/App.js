/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import 'tailwindcss/tailwind.css';
import Layout from './Layout';
import { UserProvider } from './user-context';

import Home from '../pages/Home';
import Forms from '../pages/Forms';
import NotFound from '../pages/NotFound';

const App = () => (
  <Router>
    <UserProvider>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/forms">
            <Forms />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </UserProvider>
  </Router>
);

export default App;
