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
            <b-modal title="Edit product" v-model="editModal" class="text-center justify-content-center" @ok="editThis(product.id)">
              <b-input-group prepend="Name" class="mt-3">
                <b-form-input v-model="product.name"></b-form-input>
              </b-input-group>

              <b-input-group prepend="Image Url" class="mt-3">
                <b-form-input v-model="product.image_url"></b-form-input>
              </b-input-group>

              <b-input-group prepend="Price" class="mt-3">
                <b-form-input type="number" min="0" v-model="product.price"></b-form-input>
              </b-input-group>

              <b-input-group prepend="Category" class="mt-3">
                <b-form-select v-model="product.category">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                </template>
                <b-form-select-option
                  v-for="(category, i) in $store.state.categories"
                  :key="i"
                  :value="category"
                  :selected="category === product.Category.name"
                >{{ category }}</b-form-select-option>
              </b-form-select>
              </b-input-group>
            </b-modal>
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
      editModal: false,
      product: {
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        category: ''
      }
    }
  },
  methods: {
    editProduct () {
      this.editModal = true
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    editThis (id) {
      const payload = this.product
      this.$store.dispatch('editProduct', {
        id,
        payload
      })
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
