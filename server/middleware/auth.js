module.exports = options => {
    // console.log('执行了')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')

    return async (req,res,next) => {
        // 获取请求头中的token
        // console.log(req.headers)
        const token = String(req.headers.authorization || '').split(' ').pop()
        // console.log('token is:',token)
        assert(token,401,'请提供jwt token')
        // 实际
        // assert(token,401,'请先登陆')
        // 解密
        const {id} = jwt.verify(token,req.app.get('secret'))
        assert(id,401,'无效的jwt token')
        // 实际
        // assert(id,401,'请先登陆')  
        req.user = await AdminUser.findById(id)
        // console.log(req.user)
        assert(req.user,401,'请先登陆')
    
        await next()
    }

}