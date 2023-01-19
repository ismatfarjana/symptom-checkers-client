<template>
  <div>
    <h3>The Diagnosises</h3>
    <div>
      <div v-if="$store.getters.diagnosis.length === 0">
        <Preloader color="red" scale="0.6" />
      </div>
      <div v-else>
        <div
          v-for="diagnosis in $store.getters.diagnosis"
          :key="diagnosis"
          href="#"
          class="one-diagnosis"
        >
          <div>
            <h4>Diagnosis:{{ diagnosis.Issue.Name }}</h4>
            <p>Accuracy:{{ diagnosis.Issue.Accuracy }}</p>
            <p>IcdName:{{ diagnosis.Issue.IcdName }}</p>
            <p>Proffesional Name:{{ diagnosis.Issue.ProfName }}</p>
            <p>Ranking:{{ diagnosis.Issue.Ranking }}</p>
            <p>Specialisation:</p>
            <ul
              v-for="Specialisation in diagnosis.Specialisation"
              :key="Specialisation"
              href="#"
            >
              <li>{{ Specialisation.Name }}</li>
            </ul>
          </div>
        </div>
        <div class="">
          Give permission to save this diagnosises?
          <!-- at click dispatch diagnosis saving action to save the diagnosis names, selected location name, and symptoms -->
          <button @click.prevent="onSaveDiagnosis($store.getters.diagnosis)">
            Yes
          </button>
          <!-- at click no, take to health check home -->
          <button>No, Take me to home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "@/components/Preloader.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    Preloader,
  },
  setup() {
    let store = useStore();
    let router = useRouter();

    function onSaveDiagnosis(diagnosis) {
      store
        .dispatch("saveDiagnosis", {
          symptoms: store.getters.symptoms,
          diagnosis: diagnosis,
        })
        .then((res) => {
          if (res.err) {
            alert(res.err);
            return;
          }
        });

      router.push("/previousDiagnosises");
    }

    return {
      onSaveDiagnosis,
    };
  },
};
</script>

<style>
.one-diagnosis {
  background-color: rgb(172, 229, 210);
  border: 2px solid black;
  text-align: left;
  margin: 80px;
  margin-top: 30px;
  padding: 10px 20px;
}
</style>
