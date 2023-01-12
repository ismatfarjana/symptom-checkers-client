<template>
  <div>
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
export default {};
</script>

<style>
.specialisations {
  text-align: left;
  margin-left: 100px;
  color: rgb(12, 48, 166);
  font-size: larger;
}
</style>
