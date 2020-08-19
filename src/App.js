import React, { useState } from 'react'
import {Route} from 'react-router-dom'
import Index from './container/Index'
import About from './container/About'
import Notfound from './container/Notfound'

import './App.css'

/* function App(props) {
    const [count, setCount] = useState(1)

    return (
        <div>
            <h1>hello world ！ {count}</h1>
            <button onClick={() => setCount(count + 1)}>累加</button>
        </div>
    )
}

export default App */


/* export default (
    <div>
        <Route path="/" exact component={Index}></Route>
        <Route path="/about" exact component={About}></Route>
    </div>
)
 */


export default [
    {
        path: "/",
        component: Index,
        exact: true,
        key: 'index'
    },
    {
        path: "/about",
        component: About,
        exact: true,
        key: 'about'
    },
    {
        component: Notfound,
        key: 'notfound',
    }
]
