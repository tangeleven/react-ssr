import path from 'path'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Switch, matchPath } from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import {createProxyMiddleware} from 'http-proxy-middleware'

const store = getServerStore()

import express from 'express'
const app = express()

app.use(express.static('public'))

app.use(
    '/api',
    createProxyMiddleware({target: 'http://localhost:9090', changeOrigin: true})
)

function csrRender(res) {
    // 读取csr文件 返回
    const filename = path.resolve(process.cwd(), 'public/index.csr.html')
    const html = fs.readFileSync(filename, 'utf-8')
    return res.send(html)
}

app.get("*", (req, res) => {

    if(req.query._mode=='csr'){
        return csrRender(res)
    }

    const promises = [];
    routes.some(route => {
        const match = matchPath(req.path, route)
        if (match) {
            const { loadData } = route.component
            if (loadData) {
                promises.push(loadData(store))
            }
        }
    })

    Promise.all(promises).then(() => {

        const context = {
            css: []
        }

        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    <Switch>
                        {routes.map(route => <Route {...route}></Route>)}
                    </Switch>
                </StaticRouter>
            </Provider>
        )

        if (context.statusCode) {
            res.status(context.statusCode)
        }
        console.log('csss === ', context)
        const css = context.css.join('\n');
        res.send(`
            <html>
                <head>
                    <meta charset="utf-8" />
                    <style>
                        ${css}
                    </style>
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__context = ${JSON.stringify(store.getState())}
                    </script>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `)
    })
})


app.listen(9093, () => {
    console.log('listen.....')
})