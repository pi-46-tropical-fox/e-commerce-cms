<template>
  <div class="home">
    <Navbar></Navbar>
    <button class="button" style="display: flex; margin: auto"
    v-on:click="openModal"
    >Add Product</button>
    <Modal v-if="modal"
    @addProduct="addProduct"
    @closeModal="closeModal">
    </Modal>
    <div class="card-container">
      <Card
      v-for="product in products" :key="product.id"
      :itemData="product"
      ></Card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/itemCard'
import Modal from '../components/modal'
import Navbar from './Navbar'

export default {
  name: 'Home',
  data () {
    return {
      modal: false
    }
  },
  components: {
    Card,
    Modal,
    Navbar
  },
  methods: {
    openModal () {
      this.modal = true
    },
    closeModal () {
      this.modal = false
    },
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    addProduct (data) {
      console.log(data)
      this.$store.dispatch('addProduct', data)
      this.modal = false
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
