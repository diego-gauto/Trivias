import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { NavBar } from '../../components/NavBar/NavBar'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { HomeContainer } from '../../containers/Home/Home'
import { Profile } from '../../containers/Profile/Profile'

export const AuthRouter = () => {
  return (
    <>
      <NavBar title={"Gonvar Academy"} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </>
  )
}
