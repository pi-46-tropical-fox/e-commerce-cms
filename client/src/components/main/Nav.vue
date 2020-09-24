<template>
  <nav>
    <div class="container">
      <div class="flex justify-between items-center py-2">
        <div
          @click.prevent="toggleMenu"
          class="h-full cursor-pointer text-center"
          style="width: 52px"
          id="nav-menu"
        >
          <i id="menu-btn" class="la la-bars la-lg"></i>

          <div
            v-if="isActive"
            class="absolute top-0 shadow-lg cursor-pointer text-center z-50"
            id="nav-menu-active"
            style="height: 52px; width: 52px"
          ></div>
          <div v-if="isActive" class="absolute grid grid-cols-1 shadow-lg" id="menu-contents">
            <a href="#" class="text-left" @click.prevent="navigate('dashboard')">
              <span>Home</span>
            </a>
            <a href="#" class="text-left" @click.prevent="logout">
              <span>Sign Out</span>
            </a>
          </div>
        </div>
        <div id="logo">
          <h3>{{ $store.state.title }}</h3>
        </div>
        <div class="rounded-full h-8 w-8" id="avatar"></div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',

  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },

    logout() {
      this.$emit('logout')
    },
  },
};
</script>

<style>
</style>
