<template>
  <div class="product-list">

      <div class="product-item">
          <div class="card mb-3 add-card" @click.prevent="showAddPage">
            <button class='btn btn-warning'>ADD</button>
          </div>
          <ItemCard
            v-for="item in itemsData"
            :key="item.id"
            :item=item
            >
          </ItemCard>
      </div>
      <div class="product-item-detail">
        <router-view></router-view>
        <!-- <ItemDetail v-if="onDisplayItemData"

        > </ItemDetail> -->
      </div>
    </div>
</template>

<script>
import ItemCard from '../components/ItemCard.vue'
export default {
  name: 'ProductList',
  components: {
    ItemCard
  },
  computed: {
    onDisplayItemData () {
      return this.$store.state.onDisplayData
    },
    itemsData () {
      // console.log(this.$store.state.categoriesData[2].id)
      const category = this.$store.state.categoriesData.filter(category => {
        // console.log(category.id === Number(this.$route.params.id))
        return category.id === Number(this.$route.params.id)
      })
      // console.log(category[0])
      return category[0].Products
    }
  },
  methods: {
    fetchItemsFromStore () {
      this.$store.dispatch('fetchItems')
    },
    fetchCategoriesFromStore () {
      this.$store.dispatch('fetchCategories')
    },
    showAddPage () {
      this.$router.push({ name: 'AddPage' })
    }

  },
  created () {
    this.fetchItemsFromStore()
    this.fetchCategoriesFromStore()
  }
}
</script>

<style>

</style>
