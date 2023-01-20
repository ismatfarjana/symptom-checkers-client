<template>
  <div>
    <h3>The Diagnosis:</h3>
    <div class="box">
      <div
        v-for="diagnosis in $store.getters.oneDiagnosisByID[0].diagnosis"
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
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  mounted() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();

    store.dispatch("getOneDiagnosisByID", route.params.id);
  },
};
</script>

<style scoped>
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
