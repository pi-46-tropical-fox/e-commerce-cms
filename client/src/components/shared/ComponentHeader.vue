<template>
  <div class="component-header flex">
    <div>
    <h3>{{ $props.title }} List</h3>
    </div>
    <div>
      <a class="btn" href="#">Add new {{ $props.title }}</a>
    </div>
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
