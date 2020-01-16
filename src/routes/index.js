import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ItemForm from '../components/screens/ItemForm'
import Home from '../components/screens/Home'

const Routes = (props) => {
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route
                path='/itemForm/:id'
                render={(props) => <ItemForm {...props}/>}
                />
        </Switch>
    )
}

export default Routes;