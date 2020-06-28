const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    title:{
        type:String
    },
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    body:{type:String},


      
},{
    timestamps:true
})

// 创建一个模型并导出
module.exports = mongoose.model('Article',schema)