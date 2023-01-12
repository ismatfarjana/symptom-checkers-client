import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HealthCheck from "../views/HealthCheck.vue";
import Locations from "../views/Locations.vue";
import Symptoms from "../views/Symptoms.vue";
import AllSymptoms from "../views/AllSymptoms.vue";
import Diagnosis from "../views/Diagnosis.vue";
import Specialisations from "@/views/Specialisations.vue";

import store from "@/store/index";

function authGuard(to, from, next) {
  if (!store.getters.token) {
    next({ name: "Login" });
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/healthCheck",
    name: "HealthCheck",
    component: HealthCheck,
  },
  {
    path: "/locations",
    name: "Locations",
    component: Locations,
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    component: Symptoms,
  },
  {
    path: "/allSymptoms",
    name: "AllSymptoms",
    component: AllSymptoms,
  },
  {
    path: "/diagnosis",
    name: "Diagnosis",
    component: Diagnosis,
  },
  {
    path: "/specialisations",
    name: "Specialisations",
    component: Specialisations,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
