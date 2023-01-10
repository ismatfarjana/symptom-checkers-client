import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { postJson, putJson, getJson, deleteJson } from "@/utils/http";

export default createStore({
  state: {
    token: localStorage.getItem("auth-token"),
    userId: localStorage.getItem("user-id"),
    profile: localStorage.getItem("profile") || {},
  },
  getters: {
    token(state) {
      return state.token;
    },
    userId(state) {
      return state.userId;
    },
    profile(state) {
      return state.profile;
    },
  },
  mutations: {
    setToken(state, value) {
      if (value) {
        state.token = value;
        localStorage.setItem("auth-token", value);
      } else {
        state.token = null;
        localStorage.removeItem("auth-token");
      }
    },
    setUserId(state, value) {
      if (value) {
        state.userId = value;
        localStorage.setItem("user-id", value);
      } else {
        state.userId = null;
        localStorage.removeItem("user-id");
      }
    },
    setProfile(state, value) {
      if (value) {
        state.profile = value;
        localStorage.setItem("profile", value);
      } else {
        state.profile = {};
        localStorage.removeItem("profile");
      }
    },
  },
  actions: {
    registerUser(context, data) {
      return postJson({
        url: "/register",
        data,
      }).then((obj) => {
        if (obj.token) {
          context.commit("setToken", obj.token);
          context.commit("setUserId", obj.userId);
          context.commit("setProfile", obj.profile);
        }
        return obj;
      });
    },
    login(context, data) {
      return postJson({
        url: "/login",
        data,
      }).then((obj) => {
        if (obj.token) {
          context.commit("setToken", obj.token);
          context.commit("setUserId", obj.userId);
          context.commit("setProfile", obj.profile);
        }
        return obj;
      });
    },
    updateUser(context, data) {
      return putJson({
        url: `/user/${data.id}`,
        data,
      }).then((obj) => {
        if (obj.err) {
          return obj;
        }
        context.commit("setProfile", obj.profile);
        return obj;
      });
    },
  },
  plugins: [new VuexPersistence().plugin],
  modules: {},
});
