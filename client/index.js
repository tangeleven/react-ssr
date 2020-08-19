import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import { Provider } from 'react-redux'
import { getClientStore } from '../src/store/store'

const Page = (
    <Provider store={getClientStore()}>
        <BrowserRouter>
            <Header></Header>
            <Switch>
                {routes.map(route => <Route {...route}></Route>)}
            </Switch>
        </BrowserRouter>
    </Provider >
)

if (window.__context) {
    ReactDOM.hydrate(Page,document.getElementById('root'))
} else {
    ReactDOM.render(Page,document.getElementById('root'))
}

