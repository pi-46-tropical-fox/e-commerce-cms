<template>
  <div>
    <div class="card shadow mr-2 mb-2 ml-3" style="width: 18rem;" id="itemCard">
        <img src="../assets/photo.svg" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">{{ productData.name }}</h5>
            <p class="card-text">Price: {{ productData.price }}</p>
            <p class="card-text">Stock: {{ productData.stock }}</p>
            <a href="#" class="btn btn-primary mr-2">
                <img src="../assets/edit.svg">
                Edit
                </a>
            <a href="#" class="btn btn-primary">
                <img src="../assets/trash-2.svg">
                Delete
                </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['productData'],
  name: 'ItemCard'
}
</script>

<style scoped>

</style>
