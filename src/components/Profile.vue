<template>
  <div class="profile">
    <h1>{{ msg }}</h1>
    <h4>
      This is a basic authentication starter app to use as template to quick
      start different vue apps.
    </h4>
    <ul>
      <li>On register an user will be created.</li>
      <li>
        Then the user can update their profile with required informations.
      </li>
      <li>On login/ register, the user will be directed to profile page.</li>
      <li>If the profile is already set, user can see the details below.</li>
      <li>
        If the profile is not set, user will see a form to update the profile.
      </li>
    </ul>

    <h4>Todo: Update user in UI (in progress)</h4>

    <div v-if="!$store.getters.profile">
      <h2>Update User details</h2>
      <div class="col-4 offset-4 mt-3">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="name"
            class="form-control"
            id="name"
            v-model="name"
            placeholder="Enter name"
          />
        </div>
        <div class="mb-3">
          <label for="gender" class="form-label">Gender</label>
          <input
            type="gender"
            class="form-control"
            id="gender"
            v-model="gender"
            placeholder="Enter gender"
          />
        </div>
        <div class="mb-3">
          <label for="yearOfBirth" class="form-label">Birth Year</label>
          <input
            type="yearOfBirth"
            class="form-control"
            id="yearOfBirth"
            v-model="yearOfBirth"
            placeholder="Enter Birth Year"
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary" @click.prevent="onSubmit">
            Update
          </button>
        </div>
      </div>
    </div>

    <div class="user-details">
      <h2>Congratulations! Your Profile is set!</h2>
      <h4>Name: {{ $store.getters.profile.name }}</h4>
      <h4>Gender: {{ $store.getters.profile.gender }}</h4>
      <h4>Birth year: {{ $store.getters.profile.yearOfBirth }}</h4>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Profile",
  props: {
    msg: String,
  },
  setup() {
    let name = ref("");
    let gender = ref("");
    let yearOfBirth = ref("");
    let store = useStore();
    let router = useRouter();
    function onSubmit() {
      const id = store.getters.userId;
      store
        .dispatch("updateUser", {
          id: id,
          name: name.value,
          gender: gender.value,
          yearOfBirth: yearOfBirth.value,
        })
        .then((res) => {
          if (res.err) {
            alert(res.err);
            return;
          }
          router.push("/profile");
        });
    }
    return {
      name,
      gender,
      yearOfBirth,
      onSubmit,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  padding: 4px 10px;
}
ul {
  list-style-type: disc;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

.user-details {
  margin: 40px;
  padding: 10px 20px;
  border: 2px solid black;
  background-color: rgba(255, 247, 237, 0.984);
  width: 50rem;
  text-align: left;
}
</style>
