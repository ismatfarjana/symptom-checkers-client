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
          <div>
            Symptoms experienced: {{ previousDiagnosis.selectedSymptoms }}
          </div>
          <div>
            Possible Diagnosises:
            <div class="box">
              <div
                v-for="diagnosis in previousDiagnosis.diagnosis"
                :key="diagnosis"
                class="one-dx"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import moment from "moment-timezone";
import Preloader from "@/components/Preloader.vue";

export default {
  components: {
    Preloader,
  },
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

<style scoped>
.one-data {
  border: 1px solid black;
  background-color: rgba(179, 229, 250, 0.895);
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 3rem;
  margin: 3rem;
}

.one-dx {
  padding: 1rem;
  margin: 1rem 0;
  width: 25rem;
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
