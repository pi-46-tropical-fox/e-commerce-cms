<template>
    <tr>
      <th scope="row" class="align-middle" > {{ number+1 }}</th>
      <td class="align-middle"><img :src="itemData.image_url" class="card-img-top rounded mx-auto"
          alt="product" id="imageProduct"></td>
      <td class="align-middle">{{itemData.name}}</td>
      <td class="align-middle">{{itemData.category}}</td>
      <td class="align-middle">{{itemData.stock}}</td>
      <td class="align-middle">{{itemData.price}}</td>
      <td class="align-middle">
        <a href="#" class="btn btn-product btn-warning  mr-3" @click="goToEdit(itemData.id)">Edit</a>
        <a href="#" class="btn btn-product btn-danger" @click="deleteItem(itemData.id)">Delete</a>
        </td>
    </tr>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['itemData', 'number'],
  methods: {
    deleteItem (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        this.confirmDelete(id)
      })
    },
    confirmDelete (id) {
      this.$store.dispatch('deleteProduct', id)
      this.$emit('removeData', id)
    },
    goToEdit (id) {
      this.$router.push({ path: `/products/${id}` })
    }
  }
}
</script>

<style>
#imageProduct {
   width: auto;
    height: 60px;
    display: block;
}

.btn-product {
  width: 75px;
}

</style>
