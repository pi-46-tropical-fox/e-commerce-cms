<template>
<div class="dashboard">
  <div class="container-fluid">
    <div class="row">
      <NavBar></NavBar>
      <DashboardForm></DashboardForm>
    </div>
  </div>
</div>
</template>

<script>
import DashboardForm from '@/components/DashboardForm.vue'
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'Dashboard',
  components: {
    DashboardForm,
    NavBar
  }
}
</script>

<style>

</style>
