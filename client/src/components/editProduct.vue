<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Edit Product" class="mt-2">
              <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
              <b-form  class="mt-2" @submit.prevent="updateProduct">
                <b-form-group label="Name :">
                  <b-form-input
                    v-model="product.name"
                    type="text"
                    required
                    placeholder="Enter Product Name"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Image URL :">
                  <b-form-input
                    type="text"
                    v-model="product.image_url"
                    required
                    placeholder="Enter Image URL"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Price:">
                  <b-form-input
                    type="number"
                    v-model="product.price"
                    required
                    placeholder="Enter Price"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Stock:">
                  <b-form-input
                    type="number"
                    v-model="product.stock"
                    required
                    placeholder="Enter Stock"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Gender">
                  <b-form-select
                    id="title-input"
                    v-model="product.gender"
                    :options="filters"
                    required
                    value-field="gender"
                    text-field="gender"
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Category">
                  <b-form-select
                    id="title-input"
                    v-model="product.CategoryId"
                    :options="categories"
                    required
                    value-field="id"
                    text-field="category"
                  ></b-form-select>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'editProduct',
  computed: {
    filters: {
      get () {
        return this.$store.state.filters
      }
    },
    categories: {
      get () {
        return this.$store.state.categories
      }
    },
    product: {
      get () {
        return this.$store.state.product
      }
    },
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },

  methods: {
    updateProduct () {
      this.$store.dispatch('updateProduct', this.product)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
            this.$router.push('/Home')
          }, 2000)
        })
        .catch(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 3000)
        })
    }
  },
  created () {
    this.$store.dispatch('editProduct', this.$route.params.id)
  }
}
</script>

<style>

</style>
