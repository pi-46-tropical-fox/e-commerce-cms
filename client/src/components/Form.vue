<template>
  <div class="container" style="width: 700px;">
    <form>
        <div class="form-group">
            <label for="name">Product Name</label>
            <input type="text" class="form-control" placeholder="Enter the product name . ." v-model="name">
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                <label for="color">Color</label>
                <input type="text" class="form-control" placeholder="Enter the product color . ." v-model="color">
                </div>
                <div class="col">
                <label for="capacity">Capacity</label>
                <input type="text" class="form-control" placeholder="Enter the product capacity . ." v-model="capacity">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                <label for="price">Price</label>
                <input type="text" class="form-control" placeholder="Enter the product price . ." v-model="price">
                </div>
                <div class="col">
                <label for="stock">Stock</label>
                <input type="text" class="form-control" placeholder="Enter the product stock . ." v-model="stock">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="row">
                <div class="col">
                    <label for="exampleFormControlSelect1">Select Category</label>
                    <select class="form-control" v-model="categoryId">
                        <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                        >{{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="col">
                    <label for="img_url">Image Url</label>
                    <input type="text" class="form-control" placeholder="Enter the image url . ." v-model="img_url">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div v-if="$route.params.productId !== undefined">
                <button @click.prevent="editProduct($route.params.productId)" class="btn btn-primary mr-2">Edit Product</button>
            </div>
            <div v-else>
                <button @click.prevent="addProduct" class="btn btn-primary mr-2">Add Product</button>
            </div>
            <button class="btn btn-danger">Cancel</button>
        </div>
    </form>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'Form',
  data () {
    return {
      categories: [],
      name: '',
      color: '',
      capacity: '',
      price: '',
      stock: '',
      categoryId: '',
      img_url: ''
    }
  },
  methods: {
    fetchCategory () {
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.categories = data
          console.log(data, '<<< category fetched')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    fetchProduct () {
      axios({
        method: 'GET',
        url: `/products/${this.$route.params.productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.name = data.name
          this.color = data.color
          this.capacity = data.capacity
          this.price = data.price
          this.stock = data.stock
          this.categoryId = data.CategoryId
          this.img_url = data.img_url
          console.log(data, '<<< product fetched')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    addProduct () {
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: this.name,
          color: this.color,
          capacity: this.capacity,
          price: this.price,
          stock: this.stock,
          CategoryId: this.categoryId,
          img_url: this.img_url
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$router.push({ path: '/products' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    editProduct (id) {
      axios({
        method: 'PUT',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          name: this.name,
          color: this.color,
          capacity: this.capacity,
          price: this.price,
          stock: this.stock,
          CategoryId: this.categoryId,
          img_url: this.img_url
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.$router.push({ path: '/products' })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  created () {
    this.fetchCategory()
    if (this.$route.params.productId !== undefined) {
      this.fetchProduct()
    }
  }
}
</script>

<style>

</style>
