const mongoose = require('mongoose')

// 定义一个约定schema
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    parent:{
        type:mongoose.SchemaTypes.ObjectId,ref:'Category'
    }
})
// 关联
schema.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})
schema.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})
// 创建一个模型并导出
module.exports = mongoose.model('Category',schema)