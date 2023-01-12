<template>
  <div>
    <h3>Check symptoms by Locations</h3>
    <div class="locations-container">
      <div
        v-for="location in $store.getters.locations"
        :key="location"
        href="#"
        class="location-container"
      >
        <Location :name="location.Name" :imageid="location.ID" />
        <button
          @click.prevent="onSelectLocation(location)"
          class="location-button"
        >
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Location from "@/components/Location.vue";

export default {
  components: {
    Location,
  },
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

<style scoped>
.locations-container {
  display: flex;
  flex-wrap: wrap;
}

.location-container {
  background-color: #f1f1f1;
  border: 1px solid gray;
  width: 20rem;
  margin: 10px;
  text-align: center;
  /* line-height: 40px; */
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.location-button {
  margin: 5px;
}
</style>
