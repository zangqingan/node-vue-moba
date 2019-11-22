//引入express模块
const express = require('express')

// 生成实例app
const app = express()

// 引入json模块处理req.body
app.use(express.json())
// 跨域模块
app.use(require('cors')())
// 静态资源托管
app.use('/uploads',express.static(__dirname + '/uploads'))

// 
app.set('secret','i2u34y12oi3u4y8')
// 引入路由模块
require('./router/admin')(app)
// 引入数据库模块
require('./plugins/db')(app)




// 开启监听
app.listen(3000,() => {
    console.log('http://localhost:3000')
})