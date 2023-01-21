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
            <router-link to="/healthCheck" class="nav-link"
              >Health Check</router-link
            >
          </li>

          <li class="nav-link">
            <router-link to="/previousDiagnosises" class="nav-link"
              >Previous Diagnosises</router-link
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
      this.$store.commit("setSymptoms");
      this.$store.commit("setAllSymptoms");
      this.$store.commit("setIssue");
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

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 2rem 0;
  margin-bottom: 7rem;
}

.items-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: center;
}

.item {
  background-color: #f1f1f1;
  border: 1px solid gray;
  width: 20rem;
  margin: 20px;
  text-align: center;
  /* line-height: 40px; */
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.item-button {
  margin: 5px;
}

.item-button:active {
  background-color: #42b983;
}

.item-button:focus {
  background-color: #056e86;
}

.alert-text {
  color: red;
}

.box {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.box > * {
  flex: 1 1 260px;
  background-color: rgb(182, 250, 227);
  margin: 5px;
  padding: 10px 0;
}

.symptom-button {
  border: 0;
}
.symptom-button:hover {
  background-color: #056e86;
  color: whitesmoke;
}
</style>
