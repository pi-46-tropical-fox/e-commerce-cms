<template>
  <div class="container animate__animated animate__zoomIn" style="margin-top: 10%;">
    <div class="row">
      <div class="col-md-6 col-sm-12" style="margin: 20px 0">
        <img
          :src="product.image_url"
          :alt="product.name"
          style="height: 20rem; width:20rem; border-radius:10px;"
        />
      </div>
      <div class="col-md-5 col-sm-12" style="margin: 20px 0">
        <table class="table" border="2px">
          <tbody>
            <tr>
              <th scope="row" class="bg-dark" style="color:white">Name</th>
              <td class="bg-light">{{product.name}}</td>
            </tr>
            <tr>
              <th scope="row" class="bg-dark" style="color:white">Price</th>
              <td class="bg-light">Rp. {{ $store.state.price }}</td>
            </tr>
            <tr>
              <th scope="row" class="bg-dark" style="color:white">Stock</th>
              <td class="bg-light">{{product.stock}}</td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <div class="col-12">
            <a class="btn btn-primary btn-block" @click.prevent="editProduct(product.id)">Edit</a>
          </div>
          <div class="col-12 mt-2">
            <a class="btn btn-danger btn-block" @click.prevent="deleteProduct">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  methods: {
    getProduct () {
      this.$store.dispatch('getProductById', this.$route.params.id)
    },
    deleteProduct () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteProduct', this.$route.params.id)
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        }
      })
    },
    editProduct (id) {
      this.$router.push({ path: `/edit-product/${this.$route.params.id}` })
      this.$store.commit('SET_EDIT_SUCCESS', false)
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  created () {
    this.getProduct()
  }
}
</script>
