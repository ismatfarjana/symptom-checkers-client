<template>
  <h3>Selected area: {{ $store.getters.selectedLocation }}</h3>
  <div class="items-container">
    <div
      v-for="bodySymptom in $store.getters.bodySymptoms"
      :key="bodySymptom"
      href="#"
      class="item"
    >
      <Symptom :name="bodySymptom.Name" />
      <button
        class="item-button"
        @click.prevent="onSelectOneSymptom(bodySymptom.ID)"
      >
        select
      </button>
    </div>
  </div>
  <button @click.prevent="onSubmitSymptomsIds()">Get Diagnosis</button>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Symptom from "@/components/Symptom.vue";

export default {
  components: {
    Symptom,
  },
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

    return {
      onSelectOneSymptom,
      onSubmitSymptomsIds,
    };
  },
};
</script>

<style>
/* .symptoms {
  background-color: rgb(172, 229, 210);
  padding: 5px;
}
.one-symptom {
  padding: 5px;
} */
</style>
