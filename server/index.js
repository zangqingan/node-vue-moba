//引入express模块
const express = require('express')

// 生成实例app
const app = express()

// 引入json模块处理req.body
app.use(express.json())
// 跨域模块
app.use(require('cors')())
// 上传图片静态资源托管
app.use('/uploads',express.static(__dirname + '/uploads'))
// 后台静态文件托管
app.use('/admin',express.static(__dirname + '/admin'))
// 前台静态文件托管
app.use('/',express.static(__dirname + '/web'))

// 
app.set('secret','i2u34y12oi3u4y8')
// 引入路由模块
require('./router/admin')(app)
// 引入数据库模块
require('./plugins/db')(app)
// 引入web
require('./router/web')(app)




// 开启监听
app.listen(3000,() => {
    console.log('http://localhost:3000')
})