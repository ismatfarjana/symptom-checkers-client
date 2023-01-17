<template>
  <div class="symptom">
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "Symptom",
  props: {
    name: String,
    imageid: Number,
  },

  setup() {},
};
</script>

<style>
.symptom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
