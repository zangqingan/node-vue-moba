const mongoose = require('mongoose')

// 定义一个约定schema
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    title:{
        type:String
    },
    categories:[{ type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    // 评分
    scores:{
        difficult:{type:Number},
        skills:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    // 技能
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String}
    }],
    // 出裝推薦
    items1:[
        {type:mongoose.SchemaTypes.ObjectId,ref:'Item'},
    ],
    items2:[
        {type:mongoose.SchemaTypes.ObjectId,ref:'Item'},
    ],
    // 使用技巧
    usageTips:{type:String},
    // 对抗技巧
    battleTips:{type:String},
    // 团战
    teamTips:{type:String},
    // 英雄关系
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String},
    }]

      
})

// 创建一个模型并导出
module.exports = mongoose.model('Hero',schema)