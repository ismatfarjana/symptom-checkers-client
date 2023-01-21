<template>
  <h3>Check All symptoms</h3>
  <div class="all-symp-container">
    <div class="all-symp box">
      <div
        v-for="symptom in $store.getters.allSymptoms"
        :key="symptom"
        href="#"
      >
        <button
          @click.prevent="onSelectOneSymptom(symptom)"
          class="symptom-button"
        >
          {{ symptom.Name }}
        </button>
      </div>
    </div>

    <div>
      <div v-if="$store.getters.symptoms.length < 1" class="alert-text">
        Please select symptoms First
      </div>
      <div>
        Selected Symptoms:
        <ul v-for="symptom in $store.getters.symptoms" :key="symptom">
          <li>{{ symptom.Name }}</li>
        </ul>
      </div>
      <button @click.prevent="onSubmitSymptoms()">Get Diagnosis</button>
      <button @click.prevent="symptomsForSpecialisation()">
        Find out which Specialisation to seek
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let store = useStore();
    let router = useRouter();

    function onSelectOneSymptom(symptom) {
      store.dispatch("symptoms", symptom).then((res) => {
        if (res.err) {
          alert(res.err);
          return;
        }
      });
    }

    function onSubmitSymptoms() {
      store
        .dispatch("getDiagnosis", {
          symptoms: store.getters.symptoms,
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

    function symptomsForSpecialisation() {
      store
        .dispatch("getSpecialisation", {
          symptoms: store.getters.symptoms,
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
      onSubmitSymptoms,
      symptomsForSpecialisation,
    };
  },
  mounted() {
    let store = useStore();
    store.commit("setSymptoms");
    store.commit("setDiagnosis");
    store.dispatch("getAllSymptoms");
  },
};
</script>

<style>
.all-symp-container {
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  padding: 1rem 0 2rem 0;
  margin-bottom: 7rem;
}
.all-symp {
  width: 80rem;
  /* margin: 0 6rem; */
  padding: 0 6rem;
}
</style>
