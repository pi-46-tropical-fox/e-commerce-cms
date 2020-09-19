<template>
  <div id="app">
    <b-modal title="Add a new product" v-model="showAdd" class="text-center justify-content-center" @ok="add">
      <b-input-group prepend="Name" class="mt-3">
        <b-form-input v-model="addData.name"></b-form-input>
      </b-input-group>

      <b-input-group prepend="Image Url" class="mt-3">
        <b-form-input v-model="addData.image_url"></b-form-input>
      </b-input-group>

      <b-input-group prepend="Price" class="mt-3">
        <b-form-input type="number" min="0" v-model="addData.price"></b-form-input>
      </b-input-group>

      <b-input-group prepend="Stock" class="mt-3">
        <b-form-input type="number" min="0" v-model="addData.stock"></b-form-input>
      </b-input-group>

      <b-input-group prepend="Category" class="mt-3">
        <b-form-select v-model="addData.category">
        <template v-slot:first>
          <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
        </template>
        <b-form-select-option
          v-for="(category, i) in $store.state.categories"
          :key="i"
          :value="category"
        >{{ category }}</b-form-select-option>
      </b-form-select>
      </b-input-group>
    </b-modal>

    <div id="nav" class="row justify-content-center">
      <router-link to="/" class="col-4" v-show="!this.$store.state.isLoggedIn">Home</router-link>
      <router-link to="/login" class="col-4" v-show="!this.$store.state.isLoggedIn">Login</router-link>
      <a class="col-4" href="" @click.prevent="showAdd = !showAdd" v-show="this.$store.state.isLoggedIn">Add</a>
      <a class="col-4" href="" @click.prevent="logout" v-show="this.$store.state.isLoggedIn">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      options: [

      ],
      showAdd: false,
      addData: {
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        category: ''
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    add () {
      this.$store.dispatch('addProduct', this.addData)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
