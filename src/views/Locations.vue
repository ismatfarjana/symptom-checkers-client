<template>
  <div>
    <h3>Locations</h3>
    <div v-for="location in $store.getters.locations" :key="location" href="#">
      <button @click.prevent="onSelectLocation(location)">
        {{ location.Name }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    let store = useStore();
    let router = useRouter();
    store.dispatch("getLocations");

    function onSelectLocation(location) {
      console.log("locationId:", location.ID);
      store
        .dispatch("getSymptoms", {
          locationId: location.ID,
          locationName: location.Name,
          gender: store.getters.profile.gender,
        })
        .then((res) => {
          if (res.err) {
            alert(res.err);
            return;
          }
          router.push("/symptoms");
        });
    }

    return {
      onSelectLocation,
    };
  },
  mounted() {
    let store = useStore();
    store.commit("setBodySymptoms");
    store.commit("setSymptomIds");
    store.commit("setDiagnosis");
    store.dispatch("getLocations");
  },
};
</script>

<style></style>
