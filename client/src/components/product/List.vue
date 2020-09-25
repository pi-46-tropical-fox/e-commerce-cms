<template>
  <div>
    <div class="grid">
      <div>
        <h3>Product List</h3>
      </div>
      <div>
        <a href="#" @click.prevent="toggleModal">Add new Product</a>
      </div>
    </div>

    <Table @deleteData="deleteData" :data="data" :headers="headers" type="Product" />

    <ProductForm :showModal="showModal" @toggleModal="toggleModal" />
  </div>
</template>

<script>
import ProductForm from "./Form";
import Table from "../shared/Table";
import swal from '../../config/swal';
import axios from '../../config/axios';

export default {
  name: "ProductList",

  components: {
    ProductForm,
    Table,
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },

    deleteData(id) {
      axios({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        swal.showToastSuccess(data.message)
        this.$store.dispatch('getProducts')
      })
      .catch(({response}) => {
        swal.showSwalError(response.data.join('<br>'))
      })
    }
  },

  data() {
    return {
      headers: ["Name", "Category", "Price", "Stock", "Action"],
      showModal: false
    };
  },

  computed: {
    // getters
    data: {
      get() {
        return this.$store.state.productData;
      },
    },
  },
};
</script>

<style>
</style>