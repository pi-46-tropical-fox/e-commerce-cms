<template>
  <div id="detail">
    <img :src="prod.image_url" :alt="prod.name" style="width:140px;height:140px">
    <p>Product name: {{prod.name}}</p>
    <p>Category: {{prod.category}}</p>
    <p>Description: {{prod.description}}</p>
    <p>Price: {{prod.price}}</p>
    <p>Stock: {{prod.stock}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    props: ["prod"]
  }
</script>

<style scoped>
  #detail{
    margin: auto;
    text-align: center;
  }
  p{
    margin: 0;
    padding:5px;
  }
</style>