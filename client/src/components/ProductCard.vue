<template>
  <div>
    <b-card-group class="mt-4" deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h6 class="mb-0">{{ title }}</h6>
        </template>
          <b-list-group-item
            flush
            v-for="product in products"
            :key="product.id"
          >
            <div class="row justify-content-center d-inline-block">
              <img :src="product.image_url" alt="" width="50px">
              <b-card-text>{{ product.name }}</b-card-text>
            </div>
            <div class="row justify-content-center">
              <b-card-text class="col-1">Stock: {{ product.stock }}</b-card-text>
              <b-card-text class="col-1">{{ product.price }}<img src="../assets/Gold_symbol.png" class="ml-1"></b-card-text>
            </div>
            <div class="row justify-content-center">
              <b-button variant="warning" class="mr-2" @click="editProduct(product.id)"><img src="../assets/edit.png" width="15px"></b-button>
              <b-button variant="danger" @click="deleteProduct(product.id)"><img src="../assets/trash.png" width="15px"></b-button>
            </div>
          </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      test: this.$store.state.categories[this.$route.params.categoryId - 1]
    }
  },
  methods: {
    editProduct (id) {

    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  },
  computed: {
    title () {
      return this.$store.state.categories[this.$route.params.categoryId - 1]
    },
    products () {
      return this.$store.state.products[this.title]
    }
  }
}
</script>

<style>

</style>
