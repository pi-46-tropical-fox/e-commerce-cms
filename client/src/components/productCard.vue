<template>
  <div>
  <div class="product-container">
    <!-- <div class="row">
      <div class="col-4"> -->
        <div>
          <img
            class="card-img-top"
            :src="value.image_url"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ value.name }}</h5>
            <p class="card-text">stock: {{ value.stock }}</p>
            <p class="card-text">price: Rp. {{ new Number(value.price).toLocaleString("id-ID") }}</p>
          </div>
          <router-link
              variant="primary"
              :to="{ name: 'edit-Product', params: { id: value.id } }"
              >Edit</router-link
            >
            |
            <a
              @click="deleteProduct(value.id)"
            >Delete</a>
        </div>
      </div>
    </div>
  <!-- </div>
  </div> -->
</template>

<script>
export default {
  name: 'ProductCard',
  props:['value'],
  methods: {
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    }
  },
  // created() {
  //   this.fetchData();
  // }
};
</script>

<style scoped>
.product-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 15% auto;
    gap: 15px;
    margin-left: 75px;
}</style>
