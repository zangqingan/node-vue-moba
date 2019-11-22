<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs  type="border-card" value="skills">
                <el-tab-pane label="基础信息" >
                    <el-form-item label="名称" >
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号" >
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="头像" >
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL+'/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                            >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="类型" >
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度" >
                        <el-rate v-model="model.scores.difficult" :max="9" show-score type="margin-top:0.6rem" ></el-rate>
                    </el-form-item>
                    <el-form-item label="技能" >
                        <el-rate v-model="model.scores.skills" :max="9" show-score type="margin-top:0.6rem" ></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击" >
                        <el-rate v-model="model.scores.attack" :max="9" show-score type="margin-top:0.6rem" ></el-rate>
                    </el-form-item>
                    <el-form-item label="生存" >
                        <el-rate v-model="model.scores.survive" :max="9" show-score type="margin-top:0.6rem" ></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装" >
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装" >
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧" >
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧" >
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路" >
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <!-- 技能 -->
                <el-tab-pane label="技能" name="skills">
                    <el-button  @click="model.skills.push({})"><i class="el-icon-plus">添加技能</i></el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/upload'"
                                    :show-file-list="false"
                                    :on-success="res => {$set(item,'icon',res.url)}"
                                    >
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="提示">
                                <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

            <el-form-item class="margin-top:1rem;">
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
            model:{
                name:'',
                avatar:'',
                scores:{
                    difficult:0
                }  
            },
            categories:[],
            items:[]
            
        }
    },
    methods: {
        afterUpload(res){
            // 显示赋值
            // this.$set(this.model,'avatar',res.url)
            this.model.avatar = res.url
            // console.log(res)

        },
        async save(){
            let res
            if(this.id){
                // 如果有编辑更新
                res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
            }else{
                // 如果没有新建
                res = await this.$http.post('rest/heroes',this.model)
            }
            this.model = res.data
            // 跳转路由
            this.$router.push('/heroes/list')
            // 提示成功信息
            this.$message({
                type:'success',
                message:'保存成功'
            })

        },
        async fetch(){
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            this.model = Object.assign({},this.model,res.data)
        },
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },
        async fetchItems(){
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        },
    },
    created() {
        this.fetchCategories()
        this.fetchItems()
        this.id && this.fetch()
    },
}
</script>

<style>
 
</style>