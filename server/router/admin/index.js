// 这个是路由处理模块，专门用来出来路由请求
//直接导出一个函数
module.exports = app => {
    // 初始化项目依赖
    const express = require('express')
    const AdminUser = require('../../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams:true//合并url参数，这样父级传入的路由参数，子级这里也可以使用
    })
/**
 * 通用crud接口，resource包括 categories，items，heroes，
 *  http://localhost:3000/admin/api/rest/:resource
 **/ 
    // 新建资源
    router.post('/',async (req,res) => {
        // 接收客户端传过来的数据并写入数据库
        const model = await req.Model.create(req.body)
        res.send(model)

    })
    // 资源列表
    router.get('/',async (req,res) => {
        //对于分类路由有父子(上级)分类，而其它没有
        const queryOptions ={}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        // 从数据库中查询并返回,populate('parent')关联
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 资源详情
    router.get('/:id',async (req,res) => {
        // 从数据库中通过id查找对应的并返回
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 资源更新
    router.put('/:id',async (req,res) => {
        // 从数据库中通过id查找对应的更新后并返回
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    // 删除资源
    router.delete('/:id',async (req,res) => {
        // 从数据库中通过id查找对应的更新后并返回
        const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    // 登陆授权中间件
    const authMiddleware =  require('../../middleware/auth')
    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource')
    // 挂载路由以及注册中间件
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)
// 其它路由 
    // 图片上传
    const multer = require('multer')
    // 定义一个upload上传地址
    const upload = multer({dest:__dirname + '/../../uploads'})
    // 图片上传路由,接收单个文件上传，同时字段名为file
    app.use('/admin/api/upload',authMiddleware(),upload.single('file'),async (req,res) => {
        const file = req.file//使用了中間件把file加入到req中
        // 本地地址
        // file.url = `http://localhost:3000/uploads/${file.filename}`
        // 改成线上地址
        file.url = `http://116.62.242.41/uploads/${file.filename}`
        
        res.send(file)
    })
    // 登陆验证
    app.post('/admin/api/login',async (req,res)=> {
        const {username,password} = req.body
        // 1 根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        // 使用http-assert中间件
        assert(user,422,'用户不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        // 2 校验密码
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'密码错误')
        // if(!isValid){
        //     return res.status(422).send({message:'密码错误'})
        // }
        //3 返回token
        // app.get一个参数表示获取配置
        const token = jwt.sign({ id:user._id},app.get('secret'))
        res.send({token})
        
    })
    // 错误处理中间件
    app.use(async (err,req,res,next) => {
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })



}