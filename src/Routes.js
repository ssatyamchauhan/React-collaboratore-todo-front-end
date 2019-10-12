import React from 'react'
import Projects from './App'
import ProjectView from './Component/Assignedproject/Main'
import Login from './Component/Login/login'
import Signup from './Component/SignUp/signup'
import Profile from './Component/Profile/profile'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


export default class Routes  extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/projects' exact component={Projects} />
                    <Route path='/projects/view/:cardId' exact component={ProjectView} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/profile' exact component={Profile} />
                </Switch> 
            </Router>
        )
    }

}