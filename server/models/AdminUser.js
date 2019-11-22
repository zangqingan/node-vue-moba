const mongoose = require('mongoose')

// 定义一个约定schema
const schema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{type:String,
        // 密码不能查
        select:false,
        set(val){
            // 密码散列
            return require('bcrypt').hashSync(val,10)
        }
    }


      
})

// 创建一个模型并导出
module.exports = mongoose.model('AdminUser',schema)