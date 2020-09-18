<template>
<div>
  <section id="add-product" class="row">
      <div class="col-6 d-flex align-items-center" id="home-page">
            <img src="https://image.freepik.com/free-vector/modern-web-design-concept-with-flat-style_23-2147935005.jpg" alt="" class="w-100">
      <div class="col-12">
          <div class="text-align-center">
                    <h3>Add Product</h3>
            </div>
            <form @submit.prevent="submitProduct">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input v-model="name" type="text" class="form-control" id="name" placeholder="Insert name">
                </div>
                <div class="form-group">
                    <label for="image_url">Image Url</label>
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
  name: 'AddProduct',
  data () {
      return {
          name: '',
          image_url: '',
          price: 0,
          stock: 0
      }
  },
  methods: {
      submitProduct () {
          axios({
              method: 'post',
              url: '/products',
              data: {
                 name: this.name,
                 image_url: this.image_url,
                 price: this.price,
                 stock: this.stock 
              }
          })
            .then(({data}) => {
                this.$router.push({name: 'Home'})
            })
            .catch(err => {
                console.log(err);
            })
      }
  }
}
</script>

<style>

</style>
