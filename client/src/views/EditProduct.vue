<template>
  <div>
      <section id="add-product" class="row">
      <div class="col-6 d-flex align-items-center" id="home-page">
            <img src="https://image.freepik.com/free-vector/modern-web-design-concept-with-flat-style_23-2147935005.jpg" alt="" class="w-100">
      <div class="col-12">
          <div class="text-align-center">
                    <h3>Edit Product</h3>
            </div>
            <form @submit.prevent="editProduct">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input v-model="name" type="text" class="form-control" id="name" placeholder="Insert name">
                </div>
                <div class="form-group">
                    <label for="imgUrl">Image Url</label>
                    <input v-model="image_url" type="text" class="form-control" id="imgUrl" placeholder="Insert image url">
                </div>
                <div class="form-group">
                    <label for="name">Price</label>
                    <input v-model="price" type="number" class="form-control" id="name" placeholder="Insert price">
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input v-model="stock" type="number" class="form-control" id="stock" placeholder="Insert stock">
                </div>
                <button type="submit" class="btn btn-block btn-info">Submit</button>
            </form>
        </div>
        </div>
    </section>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'EditProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0
    }
  },
  methods: {
    editProduct () {
      const id = this.$route.params.id
      const { name, image_url, price, stock } = this
      axios({
        method: 'put',
        url: '/products/' + id,
        data: {
          name,
          image_url,
          price,
          stock
        }
      })
        .then(({ data }) => {
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductById () {
      const id = this.$route.params.id
      axios({
        method: 'get',
        url: '/products/' + id,
        headers: {
          access_token:localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data);
          this.name = data.name
          this.image_url = data.image_url
          this.price = data.price
          this.stock = data.stock
        })
        .catch(err => {
          console.log(err.response, '<<< ini errornya')
        })
    }
  },
  created () {
    this.fetchProductById()
  },
//   beforeRouteEnter (to, from, next) {
//     if (localStorage.access_token) {
//       next()
//     } else {
//       next({ name: 'Home' })
//     }
//   }
}
</script>

<style>

</style>
