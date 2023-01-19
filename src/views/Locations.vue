<template>
  <div>
    <h3>Check symptoms by Locations</h3>
    <div class="items-container">
      <div
        v-for="location in $store.getters.locations"
        :key="location"
        href="#"
        class="item"
      >
        <Location :name="location.Name" :imageid="location.ID" />
        <button @click.prevent="onSelectLocation(location)" class="item-button">
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
    store.commit("setSymptoms");
    store.commit("setDiagnosis");
    store.dispatch("getLocations");
  },
};
</script>

<style scoped></style>
