<template>
  <div class="location">
    {{ name }}
    <img alt="location image" :src="getImgUrl(imageid)" />
  </div>
</template>

<script>
export default {
  name: "Location",
  props: {
    name: String,
    imageid: Number,
  },

  setup() {
    function getImgUrl(imageid) {
      let images = require.context("../assets/images", false, /\.jpg$/);
      return images("./" + imageid + ".jpg");
    }

    return {
      getImgUrl,
    };
  },
};
</script>

<style>
img {
  width: 8rem;
}
.location {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
