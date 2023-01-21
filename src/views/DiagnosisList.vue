<template>
  <div class="page-wrapper">
    <h3>The Diagnosis:</h3>
    <div class="box">
      <div
        v-for="diagnosis in $store.getters.oneDiagnosisByID[0].diagnosis"
        :key="diagnosis"
        @click.prevent="openIssue(diagnosis.issueId)"
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
      <p>
        Name:{{ $store.getters.issue.Name }} ProfName:{{
          $store.getters.issue.ProfName
        }}
      </p>
      <p>
        Description:{{ $store.getters.issue.Description }} DescriptionShort:{{
          $store.getters.issue.DescripDescriptionShorttion
        }}
      </p>
      <p>MedicalCondition:{{ $store.getters.issue.MedicalCondition }}</p>
      <div>
        <h4>Possible Symptoms:</h4>
        <ul
          v-for="symptom in $store.getters.issue.PossibleSymptoms.split(',')"
          :key="symptom"
        >
          <li>{{ symptom }}</li>
        </ul>
      </div>
      <p>
        TreatmentDescription:{{ $store.getters.issue.TreatmentDescription }}
      </p>
      <p>Synonyms:{{ $store.getters.issue.Synonyms }}</p>

      <button @click.prevent="isOpen = !isOpen" class="item-button">
        <div v-if="isOpen" @click.prevent="closeIssue()">Close</div>
      </button>
      <span v-show="isOpen">open</span>
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
  margin-bottom: 3rem;
  padding-bottom: 1rem;
}
.box {
  display: flex;
  flex-wrap: wrap;
}
.box > * {
  flex: 1 10 260px;
  background-color: azure;
  border: 1px solid rgb(4, 125, 111);
  box-shadow: 1px 10px 10px 1px lightblue;
  margin: 10px;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
}

.issue {
  margin: 1rem;
  padding: 1rem;
  background-color: rgb(127, 241, 160);
  border: 1px solid rgb(3, 102, 38);
  box-shadow: 1px 10px 10px 1px rgb(3, 99, 66);
  text-align: left;
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
