<template>
  <div>
    {{ $store.getters.bodySymptoms }}
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    let store = useStore();
    let router = useRouter();
  },
};
</script>

<style></style>
