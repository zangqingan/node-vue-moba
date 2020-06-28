<template>
<div>
    <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide>
      <img class="w-100" src="../assets/images/lunbo1.jpeg" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/lunbo2.png" alt="">
    </swiper-slide>
    <swiper-slide>
      <img class="w-100" src="../assets/images/lunbo3.jpeg" alt="">
    </swiper-slide>
    <div class="swiper-pagination pagination-home text-right px-3 pb-1"  slot="pagination"></div>
  </swiper>
  <!-- end of swiper -->
  <div class="nav-icons bg-white mt-3  text-center text--dark-1" >
     <transition name="fade">
      <div class="d-flex flex-wrap " v-if="isShow">
        <div class="nav-items mb-3 pt-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
     </transition>
    <div class="bg-light py-2 fs-sm " @click="show">
      <i class="sprite sprite-arrow mr-1"></i>
      <span>{{isShow == true?'收起':'展开'}}</span>
    </div>
  </div>
  <!-- end of nav icons -->
  <!-- <m-card icon="cc-menu-circle" title="新闻资讯">
        <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2 px-3" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>全新版本来临，新版本的上分推荐</span>
              <span>11/25</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
  </m-card> -->
  <!-- 新闻列表 -->
  <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
    <template #items="{category}">
      <router-link 
        tag="div" 
        :to="`/articles/${news._id}`"
        class="py-2 px-3 d-flex" 
        v-for="(news ,i) in category.newsList" :key="i">
        <span>[{{news.categoryName}}]</span>
        <span class="px-2">|</span>
        <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
        <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
      </router-link>
      
    </template>
  </m-list-card>
  <!-- 英雄列表 -->
  <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
    <template #items="{category}">
      <div class="d-flex flex-wrap " style="margin:0 -0.5rem">
        <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2  text-center" style="width:20%" v-for="(hero ,i) in category.heroList" :key="i">
          <img :src="hero.avatar" alt="" class="w-100">
          <div>{{hero.name}}</div>
        </router-link>
      </div>
      
    </template>
  </m-list-card>

  <m-card icon="cc-menu-circle" title="精彩视频"></m-card>
  <m-card icon="cc-menu-circle" title="图文攻略"></m-card>



</div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  // 修改日期格式
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  name: 'home',
  data() {
    return {
      swiperOption: {
          pagination: {
            el: '.pagination-home'
          },
          autoplay: {
            delay: 2000,//1秒切换一次
          },
          loop : true,
          effect : 'cube',
          
      },
      newsCats:[],//实际应该是服务器返回数据
      heroCats:[],//英雄子分类
      isShow:true
    }
  },
  created() {
    this.fetchNewsCats(),
    this.fetchHeroCats()
  },
  methods: {
    // 获取新闻子分类
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    // 获取英雄子分类
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    },
    show(){
      // window.console.log("hello")
      this.isShow = !this.isShow
    }
  },
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white' );
    &.swiper-pagination-bullet-active{
      background-color: map-get($colors, 'info' );
    }



  }
}
.nav-icons{
  border-top: 1px solid $border-coler;
  border-bottom: 1px solid $border-coler;
  .nav-items{
    width:25%;
    border-left:1px solid $border-coler ;
    &:nth-child(4n+1){
      border-left: none;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>