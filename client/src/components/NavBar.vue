<template>
<div class="col-2">
  <ul class="list-group">
  <li class="list-group-item bg-primary text-white mb-3 "><img src="../assets/user-white.svg" class="mr-1" alt="">Admin</li>
  <!-- <li class="list-group-item bg-primary text-white mb-3"><img src="../assets/plus.svg" class="mr-1" alt=""><button type="button" class="btn btn-primary"  @click.prevent="addProduct">Add Product</button></li> -->
  <!-- <li class="list-group-item bg-primary text-white mb-3"><img src="../assets/log-out.svg" class="mr-1" alt="">Log Out</li> -->
  <button type="button" class="btn btn-primary shadow mb-3"  @click.prevent="addProduct()"><img src="../assets/plus.svg" class="mr-1" alt="">Add product</button>
  <button type="button" class="btn btn-primary shadow mb-3"><img src="../assets/log-out.svg" class="mr-1" alt="">Log Out</button>
</ul>
</div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    addProduct () {
      this.$router.push({ path: '/addproducts' })
    }
  }
}
</script>

<style>

</style>
