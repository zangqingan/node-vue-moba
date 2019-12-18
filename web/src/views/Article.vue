<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 pl-2  text-blue">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">
        2019-12-17
      </div>
    </div>
    <div v-html="model.body" class="px-3 fs-lg" article-body></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-news "></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link 
        class="py-1"
        :to="`/articles/${item._id}`"
        tag="div" 
        v-for="item in model.related" 
        :key="item._id">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id:{require:true}
  },
  data() {
    return {
      model:null
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
      
    }
  },
  // 页面一进来就执行的代码
  created() {
    // 执行fetch函数
    this.fetch()
  },
  watch: {
    id:'fetch'
    // id(){
    //   this.fetch()
    // }
  },
}
</script>

<style lang="scss">
  .page-article{
    .article-body{
      img{
        max-width: 100%;
        height: auto;
      }
      iframe{
        width: 100%;
        height: auto;
      }
    }
  }
</style>