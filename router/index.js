import Vue from 'vue';
import VueRouter from 'vue-router'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
Vue.use(VueRouter) //this.$route / this.$router

import axios from 'axios'
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials=true //让ajax携带cookie
Vue.prototype.$axios = axios

//创建路由对象，设置路由规则
import goodslist from '../components/goods/goodslist'
import shopcart from '../components/shopcart/shopcart'
import goodsinfo from '../components/goods/goodsinfo'
import order from '../components/order/order'
import login from '../components/account/login'
const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/goodslist'},
    {path:'/goodslist',component:goodslist},
    {path:'/shopcart',component:shopcart},
    {path:'/goodsinfo/:goodsId',component:goodsinfo},
    {path:'/login',component:login},
    // 下面这些路由规则是需要先判断是否登录的
    // 路由元信息
    {path:'/order',meta:{needLogin:true},component:order}
   
  ]
})

//导航守卫(该方法可以拦截到所有的路由跳转)
router.beforeEach((to,from,next)=>{
  // console.log(to)
  if(to.path!=='/login'){
    localStorage.setItem('toPath',to.fullPath)
  }
  // 根据to中的meta决定哪些是可以直接过，哪些是先校验是否登录过
  if(to.meta.needLogin){
    //先判断你是否登录过，如果登录过，直接next，如果没有登录过，去登录页面
    axios.get('site/account/islogin').then(response=>{
      // console.log("-------------------------------")
      // console.log(response.data)
      if(response.data.code === 'nologin'){ // 未登录
        // router.push({path:'/login'})
        next('/login')
      }else{
        next()
      }
    })
  }else{
    next()
  }
})

//默认导出，把router对象导出出去
export default router