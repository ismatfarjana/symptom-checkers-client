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
    bodySymptoms: localStorage.getItem("bodySymptoms") || [], // symptoms by location
    symptoms: [],
    newDiagnosises: localStorage.getItem("newDiagnosises") || [],
    allSymptoms: localStorage.getItem("allSymptoms") || [],
    specialisations: [],
    previousDiagnosis: localStorage.getItem("previousDiagnosis") || {},
    oneIssueByID: {},
    issue: {},
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
    symptoms(state) {
      return state.symptoms;
    },
    newDiagnosises(state) {
      return state.newDiagnosises;
    },
    allSymptoms(state) {
      return state.allSymptoms;
    },
    specialisations(state) {
      return state.specialisations;
    },
    previousDiagnosis(state) {
      return state.previousDiagnosis;
    },
    oneIssueByID(state) {
      return state.oneIssueByID;
    },
    issue(state) {
      return state.issue;
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
    setSymptoms(state, value) {
      if (value) {
        state.symptoms.push(value);
        state.symptoms = [...state.symptoms];
        localStorage.setItem("symptoms", [state.symptoms]);
      } else {
        state.symptoms = [];
        localStorage.removeItem("symptoms");
      }
    },
    setNewDiagnosises(state, value) {
      if (value) {
        state.newDiagnosises = value;
        localStorage.setItem("diagnosis", value);
      } else {
        state.newDiagnosises = [];
      }
      localStorage.removeItem("symptoms");
    },
    setAllSymptoms(state, value) {
      if (value) {
        state.allSymptoms = value;
        localStorage.setItem("allSymptoms", value);
      } else {
        state.allSymptoms = [];
        localStorage.removeItem("allSymptoms");
      }
    },
    setSpecialisations(state, value) {
      if (value) {
        state.specialisations = value;
        localStorage.setItem("specialisations", value);
      } else {
        state.specialisations = [];
        localStorage.removeItem("specialisations");
      }
    },
    previousDiagnosis(state, value) {
      if (value) {
        state.previousDiagnosis = value;
        localStorage.setItem("previousDiagnosis", value);
      } else {
        state.previousDiagnosis = [];
      }
    },
    setIssuesListByDiagnosisID(state, value) {
      if (value) {
        state.oneIssueByID = value;
        localStorage.setItem("oneIssueByID", value);
      } else {
        state.oneIssueByID = {};
      }
    },
    setIssue(state, value) {
      if (value) {
        state.issue = value;
        localStorage.setItem("issue", value);
      } else {
        state.issue = {};
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
    symptoms(context, data) {
      context.commit("setSymptoms", data);
      return data;
    },
    getNewDiagnosises(context, data) {
      const symptomIds = data.symptoms.map((symptom) => symptom.ID);
      return getJson({
        url: `/health/diagnosis?symptoms=[${symptomIds}]&gender=${data.gender}&yearOfBirth=${data.yearOfBirth}`,
      }).then((obj) => {
        if (obj.diagnosis) {
          context.commit("setNewDiagnosises", obj.diagnosis);
        }
        return obj;
      });
    },
    getAllSymptoms(context, data) {
      return getJson({
        url: `/health/symptoms`,
      }).then((obj) => {
        if (obj.symptomsDataset) {
          context.commit("setAllSymptoms", obj.symptomsDataset);
        }
        return obj;
      });
    },
    getSpecialisation(context, data) {
      const symptomIds = data.map((symptom) => symptom.ID);
      return getJson({
        url: `/health/diagnosis/specialisations?symptoms=[${symptomIds}]&gender=${data.gender}&yearOfBirth=${data.yearOfBirth}`,
      }).then((obj) => {
        if (obj.specialisations) {
          context.commit("setSpecialisations", obj.specialisations);
        }
        return obj;
      });
    },
    saveDiagnosis(data) {
      const dataObj = {
        symptoms: data.getters.symptoms,
        diagnosis: data.getters.newDiagnosises,
      };
      return postJson({
        url: "/previousDiagnosis",
        data: dataObj,
      });
    },
    getAllDiagnosisByUserID(context) {
      return getJson({
        url: `/previousDiagnosis`,
      }).then((obj) => {
        const reversedObj = obj.reverse();
        if (obj) {
          context.commit("previousDiagnosis", reversedObj);
        }
        return reversedObj;
      });
    },
    getIssuesListByDiagnosisID(context, id) {
      return getJson({
        url: `/previousDiagnosis/${id}`,
      }).then((obj) => {
        if (obj) {
          context.commit("setIssuesListByDiagnosisID", obj);
        }
        return obj;
      });
    },
    getIssueById(context, id) {
      return getJson({
        url: `/health/issues/${id}`,
      }).then((data) => {
        if (data.status === 200 && data.issue) {
          data.issue.issueId = id;
          context.commit("setIssue", data.issue);
        }
        if (data.status === 400) {
          context.commit("setIssue", data.issue);
        }
        return data;
      });
    },
  },
  plugins: [new VuexPersistence().plugin],
  modules: {},
});
