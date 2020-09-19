<template>
  <!-- <div class="container d-flex justify-content-center ">
    <div class="row" v-for="product in data" :key="product.id">
      <div class="col-6">
        <div class="card-deck">
          <b-card
            :title="product.name"
            :img-src="product.image_url"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 50rem;"
            class="mb-2"
          >
            <b-card-text>
              Stock: {{ product.stock }} <br />
              Price: Rp. {{ new Number(product.price).toLocaleString("id-ID") }}
            </b-card-text>
            <router-link
              variant="primary"
              :to="{ name: 'edit-Product', params: { id: product.id } }"
              >Edit</router-link
            >
            <b-button
              variant="info"
              @click="deleteProduct(product.id)"
            ></b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div> -->
  <div style="width: 100vw">
  <div class="container d-flex justify-content-center justify-content-between">
    <!-- <div class="row">
      <div class="col-4"> -->
        <div class="card" v-for="product in data" :key="product.id">
          <img
            class="card-img-top"
            :src="product.image_url"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">stock: {{ product.stock }}</p>
            <p class="card-text">price: Rp. {{ new Number(product.price).toLocaleString("id-ID") }}</p>
          </div>
        </div>
      </div>
    </div>
  <!-- </div>
  </div> -->
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.data;
    }
  },
  methods: {
    fetchData() {
      return this.$store.dispatch("fetchData");
    },
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped></style>
