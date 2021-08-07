import React from 'react';
import { Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import {Home} from '../pages/Home';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';


export const Routes : React.FC = () => {
  return (
    <BrowserRouter>
      <header>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
      </header>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}