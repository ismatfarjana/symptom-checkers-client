<template>
  <div>
    <h3>Previous Diagnosises</h3>
    <div>
      <div v-if="!$store.getters.previousDiagnosis.length">
        No Diagnosis available yet!
      </div>
      <div v-else class="flex">
        <div
          v-for="previousDiagnosis in $store.getters.previousDiagnosis"
          :key="previousDiagnosis"
          href="#"
          class="one-data"
          @click="openOneDiagnosisGroup(previousDiagnosis._id)"
        >
          <h4>
            {{ time(previousDiagnosis.createdAt) }}
          </h4>
          <div>
            Symptoms experienced:
            <ul
              v-for="symptom in previousDiagnosis.selectedSymptoms"
              :key="symptom"
            >
              <li>{{ symptom.name }}</li>
            </ul>
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
import Preloader from "@/components/Preloader.vue";

export default {
  components: {
    Preloader,
  },
  setup() {
    let router = useRouter();
    let store = useStore();

    function time(time) {
      const calender = moment(time).calendar();
      return calender.split("Today").length > 1
        ? moment(time).fromNow()
        : calender.split("at")[0];
    }

    function openOneDiagnosisGroup(id) {
      store.dispatch("getIssuesListByDiagnosisID", id);
      router.push({ name: "IssuesList", params: { id: id } });
    }
    return {
      time,
      openOneDiagnosisGroup,
    };
  },
  mounted() {
    let store = useStore();
    store.commit("setIssue");
    store.dispatch("getAllDiagnosisByUserID");
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: stretch;
}
.one-data {
  border: 1px solid black;
  border-radius: 75% 20% 75% 20%;
  background-color: rgba(179, 229, 250, 0.895);
  box-shadow: 1px 10px 10px 1px lightblue;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 2rem;
  margin: 1rem;
  width: 20rem;
  cursor: pointer;
}

.one-data > * {
  flex: 1 1 26px;
}

.one-data:hover {
  background-color: rgba(82, 193, 240, 0.895);
  box-shadow: 1px 10px 10px 1px rgb(12, 73, 94);
}
</style>
