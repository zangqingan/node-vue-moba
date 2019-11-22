const mongoose = require('mongoose')

// 定义一个约定schema
const schema = new mongoose.Schema({
    title:{
        type:String
    },
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String},


      
})

// 创建一个模型并导出
module.exports = mongoose.model('Article',schema)