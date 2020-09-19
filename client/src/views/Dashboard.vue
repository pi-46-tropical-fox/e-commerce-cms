<template>
    <div class="wrapper">
        <!-- sidebar START -->
        <div class="sidebar">
            <div class="user">
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              <h5>Welcome, Admin 007</h5>
            </div>
            <ul>
                <li>
                  <router-link :to="{name:'ProductTable'}">
                    <i class="fa fa-list" aria-hidden="true"></i>Product
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'BannerTable'}">
                    <i class="fa fa-list" aria-hidden="true"></i>Banner
                  </router-link>
                </li>
                    </ul>
        </div>
          <!-- sidebar END -->
        <div class="main_content">
            <div class="header">
              <h1>E-Store CMS</h1>
              <a role="button" @click="addFormProduct">
                <i class="fa fa-plus" aria-hidden="true"></i>Product</a>
              <a role="button" @click="addFormBanner">
                <i class="fa fa-plus" aria-hidden="true"></i>Banner</a>
              <a role="button" @click="logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>Logout
              </a>
            </div>
            <!-- isi dari page yang mau diubah -->
            <router-view></router-view>
          <!-- isi dari page yang mau diubah -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    },
    addFormProduct () {
      this.$store.commit('RESET_PRODUCT_FORM', true)
    },
    addFormBanner () {
      this.$store.commit('RESET_BANNER_FORM', true)
    }
  }
}
</script>
