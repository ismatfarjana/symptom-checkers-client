<template>
  <div class="page-container">
    <h1>{{ msg }}</h1>
    <div
      class="form"
      v-if="
        !$store.getters.profile.name ||
        !$store.getters.profile.gender ||
        !$store.getters.profile.yearOfBirth
      "
    >
      <ProfileForm />
    </div>

    <div v-else>
      <div class="user-details">
        <h2>Congratulations! Your Profile is set!</h2>
        <h4>Name: {{ $store.getters.profile.name }}</h4>
        <h4>Gender: {{ $store.getters.profile.gender }}</h4>
        <h4>Birth year: {{ $store.getters.profile.yearOfBirth }}</h4>
      </div>

      <button @click.prevent="isOpen = !isOpen" class="item-button">
        <div v-if="isOpen">Close form</div>
        <div v-if="!isOpen">Open form to update profile</div>
      </button>
      <span v-show="isOpen"><ProfileForm :is-open="isOpen" /></span>
      <h5>
        Start checking your heath using
        <router-link to="/healthCheck" class="nav-link"
          >Health Check</router-link
        >
      </h5>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ProfileForm from "@/components/ProfileForm.vue";

export default {
  name: "Profile",
  components: {
    ProfileForm,
  },
  props: {
    msg: String,
  },
  setup() {
    let isOpen = ref(false);
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
      isOpen,
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

.form {
}
.user-details {
  margin: 80px;
  padding: 10px 20px;
  border: 2px solid black;
  background-color: rgba(255, 247, 237, 0.984);
  text-align: left;
}
</style>
