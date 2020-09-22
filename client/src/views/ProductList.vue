<template>
  <div class="product-list">
      <div class="product-item">
          <div class="card mb-3 add-card">
            <button class='btn btn-warning' @click.prevent="showAddPage">ADD Product</button>
            <button class='btn btn-warning' @click.prevent="deleteCategory"> DELETE Category</button>
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
      </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
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
      return this.$store.state.itemsData
    }
  },
  methods: {

    fetchCategoriesFromStore () {
      this.$store.dispatch('fetchCategories')
    },
    showAddPage () {
      this.$router.push({ name: 'AddPage' })
    },
    deleteCategory(){
      swal({
        title: "Delete this Category?",
        text: "Once deleted, products will be deleted too",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let payload = {
            id: this.$route.params.id
          }
          this.$store.dispatch('deleteCategory', payload)
          swal("Your category has been deleted!", {
            icon: "success",
          });
          this.$router.push({name: 'Dashboard'})
        } else {
          swal("Your imaginary file is safe!");
        }
      });      
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
