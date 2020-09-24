<template>
  <div id="banner">
    <ComponentHeader title="Banners" />
  </div>
</template>

<script>
import ComponentHeader from '../components/shared/ComponentHeader.vue'

export default {
  name: "Banner",
  components: {
    ComponentHeader
  },
  mounted() {
    console.log("OBJECT - BANNER");
  },
}
</script>

<style>

</style>