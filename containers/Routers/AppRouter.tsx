import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import HomeContainer from '../Home/Home';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={AuthRouter} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  )
}
