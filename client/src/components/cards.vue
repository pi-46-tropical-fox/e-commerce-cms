<template>
<div class="row">
  <div class="col-6" v-for="product in products" :key="product.id">
    <b-card
      :img-src="product.image_url"
      img-alt="Card image"
      img-width="200px"
      img-left
      class="mb-3"
       
    >
      <b-card-text>
        {{product.name}}
      </b-card-text>
      
      <button @click="getId(product.id)"><router-link  :to="{name:'Product',params:{id:product.id}}">View Product</router-link></button>
    </b-card>
  </div>
  </div>
</template>

<script>
export default {
  name: 'cards',
  data(){
    return{

    }
  },
  computed:{
    products(){
      return this.$store.state.data
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    },
    getId(id){
      this.$store.dispatch('getOne',id)
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
