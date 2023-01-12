import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { postJson, putJson, getJson, deleteJson } from "@/utils/http";

export default createStore({
  state: {
    token: localStorage.getItem("auth-token"),
    userId: localStorage.getItem("user-id"),
    profile: localStorage.getItem("profile") || {},
    locations: localStorage.getItem("locations") || [],
    selectedLocation: localStorage.getItem("selectedLocation") || "",
    bodySymptoms: localStorage.getItem("bodySymptoms") || [],
    symptomIds: [],
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
    locations(state) {
      return state.locations;
    },
    selectedLocation(state) {
      return state.selectedLocation;
    },
    bodySymptoms(state) {
      return state.bodySymptoms;
    },
    symptomIds(state) {
      return state.symptomIds;
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
    setLocations(state, value) {
      if (value) {
        state.locations = value;
        localStorage.setItem("locations", value);
      } else {
        state.locations = [];
        localStorage.removeItem("locations");
      }
    },
    setSelectedLocation(state, value) {
      if (value) {
        state.selectedLocation = value;
        localStorage.setItem("selectedLocation", value);
      } else {
        state.selectedLocation = [];
        localStorage.removeItem("selectedLocation");
      }
    },
    setBodySymptoms(state, value) {
      if (value) {
        state.bodySymptoms = value;
        localStorage.setItem("bodySymptoms", value);
      } else {
        state.bodySymptoms = [];
        localStorage.removeItem("bodySymptoms");
      }
    },
    setSymptomIds(state, value) {
      if (value) {
        console.log("state.symptomIds:", state.symptomIds);
        state.symptomIds.push(value);
        state.symptomIds = [...state.symptomIds];
        localStorage.setItem("symptomIds", [state.symptomIds]);
      } else {
        state.symptomIds = [localStorage.getItem("symptomIds")];
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
    getLocations(context) {
      return getJson({
        url: "/health/locations",
      }).then((data) => {
        if (data.bodyLocations) {
          context.commit("setLocations", data.bodyLocations);
        }
        return data;
      });
    },
    getSymptoms(context, data) {
      context.commit("setSelectedLocation", data.locationName);
      return getJson({
        url: `/health/body/symptoms?locationId=${data.locationId}&gender=${data.gender}`,
      }).then((obj) => {
        if (obj.bodySymptoms) {
          context.commit("setBodySymptoms", obj.bodySymptoms);
        }
        return obj;
      });
    },
    symptomIds(context, data) {
      console.log("data in action:", data);
      context.commit("setSymptomIds", data);
      return data;
    },
  },
  plugins: [new VuexPersistence().plugin],
  modules: {},
});
