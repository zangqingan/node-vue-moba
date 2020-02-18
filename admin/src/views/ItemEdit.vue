<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称" >
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标" >
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    >
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:{
        id:{}
    },
    data(){
        return{
            model:{}, 
        }
    },
    methods: {
        afterUpload(res){//res服务器端的响应结果
            // 显示赋值
            this.$set(this.model,'icon',res.url)

            // console.log(res)

        },
        async save(){
            let res
            if(this.id){
                // 如果有编辑更新
                res = await this.$http.put(`rest/items/${this.id}`,this.model)
            }else{
                // 如果没有新建
                res = await this.$http.post('rest/items',this.model)
            }
            this.model = res.data
            // 跳转路由
            this.$router.push('/items/list')
            // 提示成功信息
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data
        },
    },
    created() {
        this.id && this.fetch()
    },
}
</script>
<style>
  
</style>