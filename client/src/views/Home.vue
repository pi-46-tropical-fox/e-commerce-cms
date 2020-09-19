<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #222f3e;">
    <img src="../assets/logo.png" class="mh-10" style="width: 80px; height: 50px;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active" id="navbar-add">
                <a class="nav-link font-weight-bolder ml-3" href="#" style="color: #ffb142" @click="moveToAdd">Add <span
                        class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active" id="navbar-logout">
                <a class="nav-link font-weight-bolder" href="#" @click="logout" style="color: #ffb142">Logout <span
                        class="sr-only">(current)</span></a>
            </li>
        </ul>
    </div>
</nav>
  <div class="row justify-content-center">
    <h1>List</h1>
  </div>
  <div class="container border">
    <div class="row">
      <Card v-for="product in products"
      :key="product.id"
      :productData="product">
      </Card>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card.vue'
export default {
  name: 'Home',
  components: {
    Card
  },
  data () {
    return {
    }
  },
  methods: {
    fetchProductsHome () {
      this.$store.dispatch('fetchProducts')
    },
    moveToAdd () {
      this.$router.push({ path: '/products' })
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ path: '/' })
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchProductsHome()
  }
}
</script>
