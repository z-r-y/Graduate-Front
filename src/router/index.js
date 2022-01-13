import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue";//引入login组件
import Home from "../components/Home.vue"
import Welcome from "../components/Welcome.vue";
import UserList from "../components/admin/UserList.vue";
import Room from "../components/zs/Room.vue";
import Retreat from "../components/zs/Retreat.vue";
import Lodging from "../components/zs/Lodging.vue";
import Deliver from "../components/foods/Deliver.vue";
import Distribute from "../components/foods/Distribute.vue";
import Ingredients from "../components/foods/Ingredients.vue";
import Daily from "../components/fs/Daily.vue";
import Environment from "../components/fs/Environment.vue";
import Garbage from "../components/fs/Garbage.vue";
import Persinp from "../components/fs/Personp.vue";
import Personw from "../components/fs/Personw.vue";
import Bussiness from "../components/fw/Bussiness.vue";
import Goods from "../components/fw/Goods.vue";
import Io from "../components/fw/Io.vue";



Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/login"
  },
  {
    path: "/login",
    component:Login
  },
  {
    path: "/home",
    component:Home,
    redirect:"/welcome",
    children:[
      {path:"/welcome", component:Welcome},
      {path:"/logi", component:UserList},

    ]
  },
  {
    path: "/home",
    component: Home,
    children: [
      {path: "/room",component: Room},
      {path: "/lodging",component: Lodging},
      {path: "/retreat",component: Retreat},
    ]
  },
  {
    path: "/home",
    component: Home,
    children: [
      {path: "/deliver",component: Deliver},
      {path: "/distribute",component: Distribute},
      {path: "/ingredients",component: Ingredients}
    ]
  },
  {
    path: "/home",
    component: Home,
    children: [
      {path: "/daily",component: Daily},
      {path: "/environment",component: Environment},
      {path: "/garbage",component: Garbage},
      {path: "/personp",component: Persinp},
      {path: "/personw",component: Personw},
    ]
  },
  {
    path: "/home",
    component: Home,
    children: [
      {path: "/bussiness",component: Bussiness},
      {path: "/goods",component: Goods},
      {path: "/io",component: Io}
    ]
  },
]

const router = new VueRouter({
  routes
})

//挂在出现问题用
const originalPush=VueRouter.prototype.push
VueRouter.prototype.push=function push(location,onResolve,onReject){
  if(onResolve||onReject)
    return originalPush.call(this,location,onResolve,onReject)
  return originalPush.call(this,location).catch(err => err)
}


//挂在路由导航守卫
router.beforeEach((to,from,next)=>{
  //to将要访问
  //form从哪儿访问
  //next接着干 next(url) 重定向到url上
  if(to.path=='/login')
    return next();
  //获取user
  const loginFlag=window.sessionStorage.getItem("login");//取出当前用户
  if(!loginFlag)
    return next("/login");//无值，返回登录页
  next();//符合要求，放行
})

export default router
