<template>
  <div class="about">
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
         <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      items:[]
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/ads')
      this.items = res.data
    },
    // 删除操作
    async remove(row){
      this.$confirm(`是否确定删除 "${row.name}" `,"提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          // 请求接口
          const res = await this.$http.delete(`rest/ads/${row._id}`)
          this.items = res
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          // 重新执行
          this.fetch()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    }
    
  },
  created() {
    // 执行fetch
    this.fetch()
  }
}
</script>