<template>
  <div class="component-header flex">
  </div>
</template>

<script>
import axios from '../../config/axios'

export default {
  name: 'ComponentHeader',

  props: {
    title: String
  },

  methods: {
    submit() {
      axios.post(`/${this.$props.route}`, {
        header: {
          access_token: localStorage.access_token
        },
        data: {}
      })
    }
  }
};
</script>

<style>

</style>
