<template>
    <tr class="text-center">
        <td scope="row">{{index+1}}</td>
        <td class="text-wrap" style="width: 20rem;">{{banner.name}}</td>
        <td class="text-wrap" style="width: 20rem;">
            {{banner.description}}
        </td>
        <td>{{banner.status}}</td>
        <td>
          <div class="zoom">
            <img width="100" :src="image_url" alt="Banner">
          </div>
        </td>
        <td>
            <a @click="editForm(banner.id)" role="button" class="btn btn-warning">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </a>&nbsp;
            <a @click="deleteBanner(banner.id)" role="button" class="btn btn-danger">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </td>
    </tr>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'TableDataBanner',
  props: ['banner', 'index'],
  computed: {
    image_url () {
      return this.banner.image_url
    }
  },
  methods: {
    deleteBanner (id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover the data!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.$store.dispatch('deleteBanner', id)
          }
        })
    },
    editForm (id) {
      this.$store.commit('CHANGE_FORM_STATUS', false)
      this.$store.dispatch('findBanner', id)
    }
  }
}
</script>

<style>
.zoom {
  transition: transform .2s;
}

.zoom:hover {
  transform: scale(2);
}
</style>
