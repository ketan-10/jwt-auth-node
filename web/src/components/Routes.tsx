import React, {useEffect, useState} from 'react';
import { Switch, Route, BrowserRouter, Link} from 'react-router-dom';
import {Home} from '../pages/Home';
import {Login} from '../pages/Login';
import {Register} from '../pages/Register';
import { setAccessToken } from '../TokenStore';


export const Routes : React.FC = () => {

  // refreash token on page refresh.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/refreshTheAccessToken", {
      credentials: 'include',  // 'uses cookie: containing refresh_token' 
      method: 'POST',
    })
    .then(x => x.json())
    .then(x=> {
      console.log(x);
      setAccessToken(x.accessToken);
      setLoading(false);
    })
  }, [])
  if(loading) return <div>Loading...</div>

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