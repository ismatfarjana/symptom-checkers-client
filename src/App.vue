<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand" href="#"
          >ExpressVue Health app: Symptom checker</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto" v-if="!$store.getters.token">
          <li class="nav-link">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-link">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto" v-else>
          <li class="nav-link">
            <router-link to="/locations" class="nav-link"
              >Health Check</router-link
            >
          </li>

          <li class="nav-link">
            <router-link to="/profile" class="nav-link">Profile</router-link>
          </li>
          <li class="nav-link">
            <a href="#" class="nav-link" @click.prevent="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid overflow-hidden">
      <div class="row">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("setToken");
      this.$store.commit("setUserId");
      this.$store.commit("setBodySymptoms");
      this.$store.commit("setSymptomIds");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
