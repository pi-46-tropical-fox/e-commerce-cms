<template>
  <div id="menu">
    <router-link to="/">Home</router-link>
    <router-link to="/categories">Categories</router-link>
    <router-link to="/products">Products</router-link>
    <router-link to="/banners">Banners</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
#menu {
  @apply w-1/4;
}

#menu a {
  @apply block;
  @apply px-4;
  @apply py-2;
  @apply w-full;
}

#menu a:hover {
  @apply bg-blue-400;
}
</style>