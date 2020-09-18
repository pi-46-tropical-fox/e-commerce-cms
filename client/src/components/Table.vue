<template>
  <div>
    <div class="container">
      <table class="table text-center">
          <thead class="thead-dark">
              <tr>
                  <th scope="col" style="width: 200px;">Name</th>
                  <th scope="col">Color</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Image</th>
                  <th scope="col">Option</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="product in products" :key="product.id" class="mx-auto">
                  <td class="align-middle" >{{ product.name }}</td>
                  <td class="align-middle" >{{ product.color }}</td>
                  <td class="align-middle" >{{ product.capacity }}</td>
                  <td class="align-middle" >{{ product.Category.name }}</td>
                  <td class="align-middle" >{{ product.price }}</td>
                  <td class="align-middle" >{{ product.stock }}</td>
                  <td class="align-middle" ><img :src="product.img_url" alt="image" style="width: 100px;"></td>
                  <td class="align-middle" ><button class="btn btn-success mr-2" @click.prevent="editProduct(product.id)">Edit</button><button class="btn btn-danger" @click.prevent="deleteProduct(product.id)">Delete</button></td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['products'],
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deletingProduct', id)
    },
    editProduct (id) {
      this.$router.push({ path: `/products/edit/${id}` })
    }
  }
}
</script>

<style>

</style>
