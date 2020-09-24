<template>
  <div>TESTPRODUCT</div>
</template>

<script>
import axios from '../../config/axios'

export default {
  mounted(){
    axios.get({
      url: `/products/${$route.params.id}`,
      headers: {
        access_token: localStorage.access_token
      }
    })
    .then(({ data }) => {
      console.log(data);
    })
  }
}
</script>

<style>

</style>