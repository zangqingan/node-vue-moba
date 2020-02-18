//获取模型名中间件
module.exports = options => {
    return async (req,res,next) => {
        // 获取数据库模型中间件
        //使用inflection模块的classify方法转换单词大小写格式
        //注意req.params.resource中的resource是app.use父级中间件传入的这里需要在子路由处声明允许合并url参数
        const modelName = require('inflection').classify(req.params.resource)
        // return res.send({modelName})打印输出看看
        // 加入到req中这样下一个中间件就可以使用了。
        req.Model = require(`../models/${modelName}`)
        next()
    }
}