<template>
    <div class="main mt-3">
      <div class="d-flex justify-content-between ml-5">
        <h1 class="pt-2">Banner Content</h1>
        <router-link class="btn btn-success pt-3" :to="{ name: 'AddBanner' }">Add Banner</router-link>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
          <table class="table table-image">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Banner</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <router-view />
          </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
    banners(){
      return this.$store.state.banners
    }
  },
  created(){
    this.$store.dispatch("fecthBanners")
  }
}
</script>

<style scoped>
  .main {
    margin-left: 80px;
    padding: 0px 10px;
  }

  .container {
    padding: 2rem 0rem;
  }

  h4 {
    margin: 2rem 0rem 1rem;
  }

  .table-image td,
  .table-image th {
      vertical-align: middle;
  }
</style>
