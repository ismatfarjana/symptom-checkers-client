<template>
  <div>
    <div v-if="$store.getters.specialisations.length === 0">
      <Preloader color="blue" scale="0.6" />
    </div>
    <div v-else>
      <h4>You can reach out to following specialisations:</h4>
      <ul
        v-for="specialisation in $store.getters.specialisations"
        :key="specialisation"
        href="#"
        class="specialisations"
      >
        <li>{{ specialisation.Name }}</li>
      </ul>
    </div>
  </div>

  <ul>
    <li>
      <router-link to="/locations"
        >Check health symptoms by body Locations</router-link
      >
    </li>
    <li>
      <router-link to="/allSymptoms">Check overall health symptoms</router-link>
    </li>
  </ul>
</template>

<script>
import Preloader from "@/components/Preloader.vue";
export default {
  components: {
    Preloader,
  },
};
</script>

<style>
.specialisations {
  text-align: left;
  margin-left: 100px;
  color: rgb(12, 48, 166);
  font-size: larger;
}
</style>
