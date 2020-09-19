<template>
  <div class="card col-3" style="width: 18rem; height: 30px">
      <img :src="itemData.image_url" class="card-img-top" :alt="itemData.name">
      <div class="card-body">
        <h5 class="card-title">{{ itemData.name }}</h5>
        <p class="card-text">Rp. {{ itemData.price }}</p>
        <a @click.prevent="upToDateItem(itemData.id)" class="btn btn-primary">Edit</a>
        <a @click.prevent="deleteItem(itemData)" class="btn btn-danger">Delete</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['itemData'],
  methods: {
    upToDateItem (id) {
      this.$store.dispatch('updateItem', itemData)
    }
  }
}
</script>

<style>

</style>
