<template>
  <div>
    <h3>Previous Diagnosises</h3>
    <div>
      <div v-if="$store.getters.previousDiagnosis.length === 0">
        <Preloader color="green" scale="0.6" />
      </div>
      <div v-else>
        <div
          v-for="previousDiagnosis in $store.getters.previousDiagnosis"
          :key="previousDiagnosis"
          href="#"
          class="one-data"
        >
          <h3>
            Time of Dx:
            {{
              time(previousDiagnosis.updatedAt || previousDiagnosis.createdAt)
            }}
          </h3>
          <div>Symptoms: {{ previousDiagnosis.selectedSymptoms }}</div>
          <div>
            Diagnosis:
            <div
              v-for="diagnosis in previousDiagnosis.diagnosis"
              :key="diagnosis"
              class="one-dx"
            >
              <p>name:{{ diagnosis.name }}</p>
              <p>accuracy:{{ diagnosis.accuracy }}</p>
              <p>ranking:{{ diagnosis.ranking }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
export default {
  setup() {
    function time(time) {
      const calender = moment(time).calendar();
      return calender.split("Today").length > 1
        ? moment(time).fromNow()
        : calender.split("at")[0];
    }
    return {
      time,
    };
  },
  mounted() {
    let store = useStore();

    store.dispatch("getAllDiagnosisByUserID");
  },
};
</script>

<style>
.one-data {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 3rem;
  margin: 3rem;
}

.one-dx {
  display: flex;
  flex-direction: column;
}
</style>
