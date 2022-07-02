import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { NavBar } from '../../components/NavBar/NavBar'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'

export const AuthRouter = () => {
  return (
    <>
      <NavBar title={"Gonvar Academy"} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <Footer />
    </>
  )
}
