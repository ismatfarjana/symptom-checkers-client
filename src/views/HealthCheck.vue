<template>
  <div class="page-container">
    <h3>Health check pathways</h3>
    <div class="items-container">
      <div class="item">
        Check health symptoms by body Locations?

        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <button @click.prevent="onSelectLocation()" class="item-button">
          Yes
        </button>
      </div>
      <div class="item">
        Check overall health symptoms?
        <img alt="location image" src="../assets/images/17.jpg" />
        <button @click.prevent="onSelectSymptoms()" class="item-button">
          Yes
        </button>
      </div>
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
    store.commit("setSymptoms");
    store.commit("setSelectedLocation");
    store.commit("setDiagnosis");
    store.commit("setSpecialisations");
    store.dispatch("getAllSymptoms");
  },
};
</script>

<style>

</style>
