<template>
  <div class="page-container">
    <h3>Check All symptoms</h3>
    <div class="box">
      <div
        v-for="symptom in $store.getters.allSymptoms"
        :key="symptom"
        href="#"
      >
        <!-- {{ symptom.Name }} -->
        <button
          @click.prevent="onSelectOneSymptom(symptom.ID)"
          class="symptom-button"
        >
          {{ symptom.Name }}
        </button>
      </div>
    </div>
    <div v-if="$store.getters.symptomIds.length < 1" class="alert-text">
      Please select symptoms First
    </div>
    <div>
      Selected Symptoms:
      <ul v-for="symptomId in $store.getters.symptomIds" :key="symptomId">
        <li>{{ symptomId }}</li>
      </ul>
    </div>
    <button @click.prevent="onSubmitSymptomsIds()">Get Diagnosis</button>
    <button @click.prevent="symptomsIdsForSpecialisation()">
      Find out which Specialisation to seek
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let store = useStore();
    let router = useRouter();

    function onSelectOneSymptom(symptomId) {
      store.dispatch("symptomIds", symptomId).then((res) => {
        if (res.err) {
          alert(res.err);
          return;
        }
      });
    }

    function onSubmitSymptomsIds() {
      store
        .dispatch("getDiagnosis", {
          symptoms: store.getters.symptomIds,
          yearOfBirth: store.getters.profile.yearOfBirth,
          gender: store.getters.profile.gender,
        })
        .then((res) => {
          if (res.err) {
            alert(res.err);
            return;
          }
        });

      router.push("/diagnosis");
    }

    function symptomsIdsForSpecialisation() {
      store
        .dispatch("getSpecialisation", {
          symptoms: store.getters.symptomIds,
          yearOfBirth: store.getters.profile.yearOfBirth,
          gender: store.getters.profile.gender,
        })
        .then((res) => {
          if (res.err) {
            alert(res.err);
            return;
          }
        });

      router.push("/specialisations");
    }

    return {
      onSelectOneSymptom,
      onSubmitSymptomsIds,
      symptomsIdsForSpecialisation,
    };
  },
  mounted() {
    let store = useStore();
    store.commit("setSymptomIds");
    store.commit("setDiagnosis");
    store.dispatch("getAllSymptoms");
  },
};
</script>

<style></style>
