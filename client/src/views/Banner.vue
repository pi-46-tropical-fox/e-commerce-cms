<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-5">
      <div class="row">
        <div class="col-6">
        <router-link class="btn-sm btn-success mr-2" :to="{ name: 'AddProduct' }">Add Banner</router-link>
        <router-view></router-view>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2 class="mt-3">List of Banners</h2>
          <table class="table table-stripped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">status</th>
                <th scope="col">Updated At</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Banner',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
