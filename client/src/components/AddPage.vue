<template>
  <div class="">
    <Navbar></Navbar>
    <AddForm></AddForm>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import AddForm from '../components/AddForm'

export default {
  name: 'AddPage',
  components: {
    Navbar,
    AddForm
  },
  mounted () {
    if (this.$store.state.role === '') {
      this.$router.push('/products')
    }
  }
}
</script>

<style>

</style>
