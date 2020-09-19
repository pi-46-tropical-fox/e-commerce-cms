<template>
<div id="list">
<div class="row">
  <div class="card-deck col-6" v-for="product in products" :key="product.id">
    <b-card
      :img-src="product.image_url"
      img-alt="Card image"
      img-width="200px"
      img-left
      class="mb-3"
       
    >
      <b-card-text id="text">
        {{product.name}}
      </b-card-text>
      
      <button class="btn" @click="getId(product.id)"><router-link id="btn-link" :to="{name:'Product',params:{id:product.id}}">View Product</router-link></button>
    </b-card>
  </div>
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
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

#text{
  font-family: 'Oswald', sans-serif;
  font-size: x-large;
}
.btn{
  background-color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bolder;
  
}
#btn-link{
  color: #fff;
  text-decoration: none;
}

#btn-link:hover{
  color: #2c3e50;
}
.btn:hover{
  background:#42b983;

}
#list{
  max-height: 495.5px;
  overflow-x: hidden;
}
</style>
