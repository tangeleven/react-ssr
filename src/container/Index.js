
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.module.css'

console.log(1111,  styles)
const attr = {
    title: 'abcde'
}
const abc = styles._getCss();

function Index(props) {
    console.log(2222, abc, typeof abc)
    
    if (props.staticContext) {
        
        
        
        props.staticContext.css.push(abc)
    }
    useEffect(()=> {
        if (!props.list.length) {
            props.getIndexList()
        }

    }, [])
    return (
        <div>
            <h1 className={styles.title}>Index  {styles.title}</h1>
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