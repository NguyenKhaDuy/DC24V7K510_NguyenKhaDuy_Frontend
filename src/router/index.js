import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/contacts",
    name: "contactbook",
    component: () => import("@/views/ContactBook.vue"),
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  if (!user && to.name !== "login" && to.name !== "register") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
