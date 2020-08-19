
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.css'

console.log(1111,  styles)

function Index(props) {
    if (props.staticContext) {
        console.log(2222, styles._getCss())
        // props.staticContext.css.push(result)
    }
    useEffect(()=> {
        // props.dispatch(getIndexList())
        if (!props.list.length) {
            props.getIndexList()
        }

    }, [])
    return (
        <div>
            <h1 className={styles.title}>Index</h1>
            <ul>
                {props.list.map((item, index) => {
                    return (
                        <li key={index}>{item.name}</li>
                    )
                })}
            </ul>
        </div>
    )
}

Index.loadData = (store) => {
    return store.dispatch(getIndexList())
}

function mapStateToProps(state, ownProps) {
    return {
        ...state.index
    }
}
function mapDispatchToProps(dispatch) {

    return {
        getIndexList: () => dispatch(getIndexList())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)