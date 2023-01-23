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
        @click.prevent="onSelectOneSymptom(bodySymptom)"
      >
        select
      </button>
    </div>
  </div>
  <button @click.prevent="onSubmitSymptoms()">Get Diagnosis</button>
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

    function onSelectOneSymptom(symptom) {
      const updatedObject = {
        ID: symptom.ID,
        Name: symptom.Name,
      };
      store.dispatch("symptoms", updatedObject).then((res) => {
        if (res.err) {
          alert(res.err);
          return;
        }
      });
    }

    function onSubmitSymptoms() {
      store
        .dispatch("getNewDiagnosises", {
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

    return {
      onSelectOneSymptom,
      onSubmitSymptoms,
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
