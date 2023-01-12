<template>
  <div class="symptoms">
    <h3>Selected area: {{ $store.getters.selectedLocation }}</h3>
    <div
      v-for="bodySymptom in $store.getters.bodySymptoms"
      :key="bodySymptom"
      href="#"
      class="one-symptom"
    >
      {{ bodySymptom.Name }}
      <button @click.prevent="onSelectOneSymptom(bodySymptom.ID)">
        select
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

    function onSelectOneSymptom(symptomId) {
      console.log("symptomId:", symptomId);
      // const previousIds = store.getters.symptomIds;
      // console.log("previousIds:", previousIds);
      // const updatedIdsArray = [previousIds, ...symptomId];

      // console.log("updatedIdsArray:", updatedIdsArray);
      store.dispatch("symptomIds", symptomId).then((res) => {
        if (res.err) {
          alert(res.err);
          return;
        }
      });
    }

    return {
      onSelectOneSymptom,
    };
  },
};
</script>

<style>
.symptoms {
  background-color: rgb(172, 229, 210);
  padding: 5px;
}
.one-symptom {
  padding: 5px;
}
</style>
