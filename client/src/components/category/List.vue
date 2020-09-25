<template>
  <div>
    <div class="grid">
      <div>
        <h3>Category List</h3>
      </div>
      <div>
        <a href="#" @click.prevent="toggleModal">Add new Category</a>
      </div>
    </div>

    <Table :data="data" :headers="headers" type="Category" />

    <CategoryForm :showModal="showModal" @toggleModal="toggleModal" />
  </div>
</template>

<script>
import Table from "@/components/shared/Table";
import CategoryForm from './Form';

export default {
  components: {
    Table,
    CategoryForm
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },

    deleteData(id) {
      axios({
        url: `/categories/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        swal.showToastSuccess(data.message)
        this.$store.dispatch('getCategories')
      })
      .catch(({response}) => {
        swal.showSwalError(response.data.join('<br>'))
      })
    }
  },

  data() {
    return {
      headers: ["Name", "Description", "Action"],
      showModal: false
    };
  },

  computed: {
    // getters
    data: {
      get() {
        return this.$store.state.categoryData;
      },
    },
  },
};
</script>

<style>
</style>