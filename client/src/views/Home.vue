<template>
  <div class="home">
    <navbar></navbar>
    <!-- {{data}} -->
    <productCard v-for="card in data" :key="card.id" :value='card'></productCard>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

import navbar from '../components/navbar'
import productCard from '../components/productCard'

export default {
  name: 'Home',
  components: {
    productCard,
    navbar
  },
  data(){
    return {
      card :[]
    }
  },
  methods:{
    fetch(){
      return this.$store.dispatch('fetchData')
    }
  },
  created(){
    this.fetch()
  },
   computed: {
    data() {
      return this.$store.state.data;
    }
  },
  // methods: {
  //   fetchData() {
  //     return this.$store.dispatch("fetchData");
  //   },
  //   deleteProduct(id) {
  //     this.$store.dispatch("deleteProduct", id);
  //   }
  // },
  // created() {
  //   this.fetchData();
  // }

}
</script>
