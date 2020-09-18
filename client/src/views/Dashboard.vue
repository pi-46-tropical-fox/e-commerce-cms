<template>
<div class="dashboard">
   <div class="col" style="height: 100%; position: fixed; top: 10px; ">
     <NavBar></NavBar>
     <DashboardForm></DashboardForm>
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
