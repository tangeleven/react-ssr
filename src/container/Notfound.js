
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

function Status({ code, children }) {
    return (
        <Route render={({staticContext}) => {
            if (staticContext) {
                staticContext.statusCode = code
            }
            return children
        }}></Route>
    )
}

function Notfound(props) {
    return (
        <Status code={404}>
            <div>
                <h1>404！！！页面没找到</h1>
            </div>
        </Status>

    )
}


export default Notfound