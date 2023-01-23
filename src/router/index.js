import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HealthCheck from "../views/HealthCheck.vue";
import Locations from "../views/Locations.vue";
import Symptoms from "../views/Symptoms.vue";
import AllSymptoms from "../views/AllSymptoms.vue";
import NewDiagnosisesList from "../views/NewDiagnosisesList.vue";
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
    beforeEnter: authGuard,
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
    beforeEnter: authGuard,
  },
  {
    path: "/allSymptoms",
    name: "AllSymptoms",
    component: AllSymptoms,
    beforeEnter: authGuard,
  },
  {
    path: "/diagnosis",
    name: "NewDiagnosisesList",
    component: NewDiagnosisesList,
    beforeEnter: authGuard,
  },
  {
    path: "/specialisations",
    name: "Specialisations",
    component: Specialisations,
    beforeEnter: authGuard,
  },
  {
    path: "/previousDiagnosises",
    name: "PreviousDiagnosises",
    component: () => import("../views/PreviousDiagnosises.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/previousDiagnosises/issues/:id",
    name: "IssuesList",
    component: () => import("../views/IssuesList.vue"),
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
