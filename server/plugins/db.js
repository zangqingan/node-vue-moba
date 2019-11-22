// 这个是数据库处理模块，专门用来curd

//直接导出一个函数

module.exports = app => {

    // 引入mongoose
    const mongoose = require('mongoose')
    // 开启连接
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{useNewUrlParser:true , useUnifiedTopology: true} )




}