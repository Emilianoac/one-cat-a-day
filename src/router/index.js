import { createRouter, createWebHashHistory  } from "vue-router"
import Home from "../views/Home.vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/cat/:id",
      name: "catProfile",
      meta: {
        title: ""
      },
      props: true,
      component: () => import("../views/CatProfile.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      el: "#app",
      top: -10,
      behavior: "smooth"
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title != "" ? `${to.meta.title} | One cat a day`: "One cat a day" 
  next()
})

export default router
