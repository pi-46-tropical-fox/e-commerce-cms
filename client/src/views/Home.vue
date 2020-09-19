<template>
  <div>
    <Navbar></Navbar>
    <i class="fas fa-plus-circle fa-5x add-item m-5" @click="toggleStatus"></i>
      <AddForm v-if="status"></AddForm>
    <div class="card-container my-5">
      <Card
      v-for="product in products"
      :key="product.id"
      :product ="product"
      >
      <EditForm
      :id="product.id"
      :item="product"
      ></EditForm>
      </Card>
    </div>
  </div>
</template>

<script>
import EditForm from '../components/EditForm'
import AddForm from '../components/AddForm'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
export default {
  name: 'Home',
  data () {
    return {
      status: false
    }
  },
  components: {
    Card,
    Navbar,
    AddForm,
    EditForm
  },
  methods: {
    toggleStatus () {
      this.status = !this.status
    },
    fetchData () {
      this.$store.dispatch('fetchProduct')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.fetchData()
    } else {
      this.$router.push('/')
    }
  }
}
</script>
