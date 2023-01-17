<template>
  <div>
    <h2>Update User details</h2>
    <div class="mt-3">
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
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "ProfileForm",
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

<style></style>
