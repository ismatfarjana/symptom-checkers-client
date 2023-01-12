<template>
  <div>
    <h5>Health check pathways</h5>
    <div>
      Check health symptoms by body Locations?
      <button @click.prevent="onSelectLocation()">Yes</button>
    </div>
    <div>
      Check overall health symptoms?
      <button @click.prevent="onSelectSymptoms()">Yes</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let router = useRouter();
    function onSelectLocation() {
      router.push("/locations");
    }

    function onSelectSymptoms() {
      router.push("/allSymptoms");
    }

    return {
      onSelectLocation,
      onSelectSymptoms,
    };
  },

  mounted() {
    let store = useStore();
    store.commit("setBodySymptoms");
    store.commit("setSymptomIds");
    store.commit("setSelectedLocation");
    store.commit("setDiagnosis");
    store.commit("setSpecialisations");
    store.dispatch("getAllSymptoms");
  },
};
</script>

<style></style>
