<template>
  <div>
    <h3>Locations</h3>
    <div
      class="form-check"
      v-for="location in $store.getters.locations"
      :key="location"
      href="#"
    >
      <button @click.prevent="onSelectLocation(location.ID)">
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

    function onSelectLocation(locationId) {
      console.log("locationId:", locationId);
      store
        .dispatch("getSymptoms", {
          locationId: locationId,
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
    store.dispatch("getLocations");
  },
};
</script>

<style></style>
