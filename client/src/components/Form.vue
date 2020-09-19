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
            <div class="row">
                <div v-if="$route.params.productId !== undefined">
                    <button @click.prevent="editProduct($route.params.productId)" class="btn btn-primary mr-2">Edit Product</button>
                </div>
                <div v-else>
                    <button @click.prevent="addProduct" class="btn btn-primary mr-2">Add Product</button>
                </div>
                <button @click.prevent="back" class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'
export default {
  name: 'Form',
  data () {
    return {
      name: '',
      color: '',
      capacity: '',
      price: '',
      stock: '',
      categoryId: 1,
      img_url: '',
      webTitle: ''
    }
  },
  methods: {
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
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
          console.log(data, '<<< product fetched to edit')
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    addProduct () {
      const data = {
        name: this.name,
        color: this.color,
        capacity: this.capacity,
        price: this.price,
        stock: this.stock,
        CategoryId: this.categoryId,
        img_url: this.img_url
      }
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: "Don't save"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('addingProduct', data)
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    },
    editProduct (id) {
      const data = {
        name: this.name,
        color: this.color,
        capacity: this.capacity,
        price: this.price,
        stock: this.stock,
        CategoryId: this.categoryId,
        img_url: this.img_url
      }
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: "Don't save"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('updatingProduct', { data, id })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    },
    back () {
      this.$router.push({ path: '/products' })
    }
  },
  created () {
    this.fetchCategory()
    if (this.$route.params.productId !== undefined) {
      this.fetchProduct()
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style>

</style>
