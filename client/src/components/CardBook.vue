<template>
<div>
  <router-link :to="{ name: 'OneProductPage', params : { product_id: product.id } }" class="nav-link"
  id="nav-login" href="#">
  <a href="" class="custom-card">
  <div class="card" style="max-width: 17rem;" id="card-each"
    :book="product.name"
    img-height="250"
    img-width="250"
  >
    <!-- :img-src="product.image_url"
    img-alt="Cover book image" -->
      <!-- Card image -->
      <img class="card-img-top" id="card-title" :src="product.image_url" style="height: 25rem;" alt="">

      <!-- Card content -->
      <div class="card-body">
        <!-- Title -->
        <h4 class="card-title" id="card-name"><a>{{product.name}} </a></h4>
        <!-- Text -->
        <p class="card-text" id="card-price"> Rp. {{product.price}},- </p>
        <p class="card-text" id="card-stock"> Stock: {{product.stock}} </p>
        <!-- Button -->
        <!-- <a href="#" id="button-detail" class="centering-btn stretched-link">Detail</a> -->
      </div>
    <!-- </div> -->
  </div>
  </a>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'CardBook',
  props: ['product']
}
</script>

<style scoped>
/* #card-body {
  background-color: aliceblue;
} */

a.custom-card,
a.custom-card:hover {
  text-decoration: none;
}

#card-each {
  /* background: rgb(20, 20, 20); */
  /* background: #00b894; */
  margin: 50px;
  background: #f8ebdf;
  max-height: 43rem;
  color: black;
}

.centering-btn {
  /* background: #0088cc; */
  /* padding: 2%; */
  /* position: absolute; */
  /* top: 0; */
  left: 6rem;
  bottom: 5rem;
  right: 6rem;
}

#button-detail {
  position: absolute;
  margin: 10px 0 0 0;
  bottom: 0px;
}

</style>
