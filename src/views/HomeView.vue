<template>
  <div class="home">
    <div v-if="!$store.getters.token">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>

    <div>
      <Profile msg="Hello user" />
    </div>

    <!-- add profile component -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Profile from "@/components/Profile.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Profile,
  },
};
</script>
