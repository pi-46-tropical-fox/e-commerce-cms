<template>
  <div class="dashboard-page">
    <div class="category-bar">
      <router-link
        v-for='category in categoriesData'
        :key='category.id'
        class="btn btn-warning category-item"
        :to="`/dashboard/product-list/${category.id}`"
        >
        <button class="btn btn-warning" @click='fetchItemsFromStore(category)'>{{category.name}}</button>
      </router-link>
      <div class="add-category">
        <input type="text" placeholder="Add Category" v-model="newCategoryName">
        <button class="btn btn-warning add-category-button" @click.prevent="addCategory">+</button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      // itemsData: []
      newCategoryName: ''
    }
  },
  components: {
  },
  computed: {
    // itemsData () {
    //   return this.$store.state.itemsData
    // },

    categoriesData () {
      return this.$store.state.categoriesData
    }
  },
  methods: {
    fetchItemsFromStore (category) {
      console.log('masuk')
      const payload = {
        id: category.id
      }
      this.$store.dispatch('fetchItems', payload)
    },
    addCategory () {
      const payload = {
        name: this.newCategoryName
      }

      this.$store.dispatch('addCategory', payload)
      this.newCategoryName = ''
    },
    fetchCategoriesFromStore () {
      this.$store.dispatch('fetchCategories')
    }

  },
  created () {
    // this.fetchItemsFromStore()
    this.fetchCategoriesFromStore()
  }
}
</script>

<style>

</style>
