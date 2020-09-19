<template>
    <tr class="text-center">
        <td scope="row">{{index+1}}</td>
        <td class="text-wrap" style="width: 14rem;">{{product.name}}</td>
        <td>
          <div class="zoom">
            <img width="70" :src="product.image_url" alt="product">
          </div>
        </td>
        <td>{{price}}</td>
        <td>{{product.stock}}</td>
        <td>{{product.category}}</td>
        <td>
          <div class="zoom">
            <img width="70" src="https://images-na.ssl-images-amazon.com/images/I/71UgwaC4DjL._SL1500_.jpg" alt="banner">
          </div>
          </td>
        <td>
            <a @click="editForm(product.id)" role="button" class="btn btn-warning">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </a>&nbsp;
            <a @click="deleteProduct(product.id)" role="button" class="btn btn-danger">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </td>
    </tr>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'TableDataProduct',
  props: ['product', 'index'],
  computed: {
    image_url () {
      return this.products.image_url
    },
    price () {
      return this.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }
  },
  methods: {
    deleteProduct (id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover the data!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('deleteProduct', id)
          }
        })
    },
    editForm (id) {
      this.$store.commit('CHANGE_FORM_STATUS', false)
      this.$store.dispatch('findProduct', id)
    }
  }
}
</script>
