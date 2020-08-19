
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import axios from 'axios'

const reducer = combineReducers({
    index: indexReducer
})

const serverAxios = axios.create({
    baseURL: "http://localhost:9090/"
})

const clientAxios = axios.create({
    baseURL: "/"
})

// const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument()))

// export default store

export const getServerStore = () => {
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
    const defaultState = window.__context ? window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
