<template>
  <div class="page-wrapper">
    <h3>The Diagnosis:</h3>
    <div class="dxBox">
      <div
        v-for="diagnosis in $store.getters.oneDiagnosisByID[0].diagnosis"
        :key="diagnosis"
        @click.prevent="openIssue(diagnosis.issueId)"
        :class="[
          diagnosis.issueId === $store.getters.issue.issueId ? 'active' : 'dx',
        ]"
      >
        <h5
          :class="[
            diagnosis.accuracy >= 90
              ? 'more'
              : diagnosis.accuracy < 90 && diagnosis.accuracy >= 50
              ? 'moderate'
              : 'less',
          ]"
        >
          {{ diagnosis.accuracy }}%
        </h5>
        <h4>{{ diagnosis.profname }}</h4>
        or, {{ diagnosis.name }}
        <hr />
        <div v-if="diagnosis.cause">
          <h5>Underlying Possible Reasons:</h5>
          <ul v-for="cause in diagnosis.cause.split(';')" :key="cause">
            <li>{{ cause }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="!$store.getters.issue.Description">
      <div v-if="$store.getters.issue === 'issueId missing or invalid!'">
        Click on an Issue to see details
      </div>
      <div v-if="$store.getters.issue !== 'issueId missing or invalid!'">
        <Preloader color="red" scale="0.6" />
      </div>
    </div>
    <div v-else class="issue">
      <div>
        <button @click.prevent="closeIssue()" class="item-button">X</button>
      </div>

      <div>
        <div class="issue-details">
          <h4>Name:</h4>
          {{ $store.getters.issue.Name }}
        </div>
        <div class="issue-details">
          <h4>ProfName:</h4>
          {{ $store.getters.issue.ProfName }}
        </div>
        <div class="issue-details">
          <h4>Description:</h4>
          {{ $store.getters.issue.Description }} DescriptionShort:{{
            $store.getters.issue.DescripDescriptionShorttion
          }}
        </div>
        <div class="issue-details">
          <h4>MedicalCondition:</h4>
          {{ $store.getters.issue.MedicalCondition }}
        </div>
        <div class="issue-details">
          <h4>Possible Symptoms:</h4>
          <ul
            v-for="symptom in $store.getters.issue.PossibleSymptoms.split(',')"
            :key="symptom"
          >
            <li>{{ symptom || "not available" }}</li>
          </ul>
        </div>
        <div class="issue-details">
          <h4>TreatmentDescription:</h4>
          {{ $store.getters.issue.TreatmentDescription || "not available" }}
        </div>
        <div class="issue-details">
          <h4>Synonyms:</h4>
          {{ $store.getters.issue.Synonyms || "not available" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref } from "vue";
import Preloader from "@/components/Preloader.vue";
export default {
  components: {
    Preloader,
  },
  setup() {
    let isOpen = ref(false);
    let store = useStore();

    async function openIssue(id) {
      store.commit("setIssue");
      await store.dispatch("getIssueById", id);
    }

    function closeIssue() {
      store.commit("setIssue");
      store.dispatch("getIssueById");
      return (isOpen = !isOpen);
    }
    return {
      isOpen,
      openIssue,
      closeIssue,
    };
  },
  mounted() {
    let store = useStore();
    let route = useRoute();
    store.dispatch("getIssueById");
    store.dispatch("getOneDiagnosisByID", route.params.id);
  },
};
</script>

<style scoped>
.page-wrapper {
  margin: 3rem auto;
  padding-bottom: 1rem;
}
.dxBox {
  display: flex;
  flex-wrap: wrap;
}
.dxBox > * {
  flex: 1 10 260px;
  background-color: azure;
  border: 1px solid rgba(4, 125, 111, 0.152);
  /* border-radius: 75% 20% 75% 20%; */
  box-shadow: 1px 10px 10px 1px lightblue;
  margin: 10px;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  max-width: 60rem;
}

.dx:hover {
  background-color: rgba(82, 193, 240, 0.895);
  box-shadow: 1px 10px 10px 1px rgb(12, 73, 94);
}
.active {
  background-color: rgba(82, 193, 240, 0.895);
  box-shadow: 1px 10px 10px 1px rgb(12, 73, 94);
}

.issue {
  display: flex;
  flex-direction: row-reverse;
  margin: 1rem;
  padding: 1rem;
  background-color: rgb(127, 241, 160);
  border: 1px solid rgb(3, 102, 38);
  box-shadow: 1px 10px 10px 1px rgb(3, 99, 66);
  text-align: left;
}
.issue-details {
  padding-bottom: 20px;
}

.more {
  color: red;
}
.moderate {
  color: rgb(255, 132, 0);
}
.less {
  color: rgb(23, 110, 4);
}
</style>
