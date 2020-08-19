const express = require('express')
const app = express()


app.get('/api/course/list', (req, res) => {
    // 支持跨域调用
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Content-Type','application/json;charset=utf-8')
    res.json({
        code: 0,
        list: [
            {name: 'aaaaa', id: 1},
            {name: 'bbbbb', id: 2},
            {name: 'ccccc', id: 3},
            {name: 'ddddd', id: 4},
        ]
    })
})

app.listen(9090, () => {
    console.log('mock启动完毕')
})