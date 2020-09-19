<template>
  <div class="dashboard-page">
    <div class="category-bar">
      <router-link
        v-for='category in categoriesData'
        :key='category.id'
        class="btn btn-warning category-item"
        :to="`/dashboard/product-list/${category.id}`"
        >
        {{category.name}}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // itemsData: []
    }
  },
  components: {
  },
  computed: {
    itemsData () {
      return this.$store.state.itemsData
    },

    categoriesData () {
      return this.$store.state.categoriesData
    }
  },
  methods: {
    fetchItemsFromStore () {
      this.$store.dispatch('fetchItems')
    },

    fetchCategoriesFromStore () {
      this.$store.dispatch('fetchCategories')
    },

  },
  created () {
    this.fetchItemsFromStore()
    this.fetchCategoriesFromStore()
  }
}
</script>

<style>

</style>
