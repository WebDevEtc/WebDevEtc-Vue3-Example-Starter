import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BlogIndex from "@/components/blog/views/BlogIndex.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'blog.index',
    component: BlogIndex,
  },
  {
    path: '/post/:slug',
    name: 'blog.show',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "blog-show" */ '../components/blog/views/SinglePost.vue')
  },
  {
    path: '/add',
    name: 'blog.create',
    component: () => import(/* webpackChunkName: "blog-create" */ '../components/blog/views/AddPost.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
