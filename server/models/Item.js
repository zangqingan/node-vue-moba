const mongoose = require('mongoose')

// 定义一个约定schema
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    icon:{
        type:String
    }
})

// 创建一个模型并导出
module.exports = mongoose.model('Item',schema)