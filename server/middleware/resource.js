module.exports = options => {
    return async (req,res,next) => {
        // 获取数据库模型中间件
        const modelName = require('inflection').classify(req.params.resource)
        // return res.send({modelName})打印输出看看
        // 加入到req中这样下一个中间件就可以使用了。
        req.Model = require(`../models/${modelName}`)
        next()
    }
}