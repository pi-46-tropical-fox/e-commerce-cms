<template>
  <div >
    <Navigation></Navigation>
    <MainSection ></MainSection>
  </div>
</template>

<script>
  import axios from 'axios'
  import Navigation from '../components/admin/Navigation'
  import MainSection from '../components/admin/MainSection'

  export default {
    name: 'AdminDashboard',
    components:{
      Navigation,
      MainSection
    },
    created(){
      this.$store.dispatch('getData')
    },
    methods:{

    }
  };
</script>

<style scoped>

</style>
