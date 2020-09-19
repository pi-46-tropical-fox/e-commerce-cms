<template>
  <div>
    <!-- Footer -->
    <footer class="py-4 bg-dark">
      <div class="container">
        <h2 class="m-0 text-center text-white" style="font-family: system-ui;">{{word}}</h2>
        <!-- <p class="m-0 text-center text-white">Developer &copy; Arviandito Caessara 2020</p> -->
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: [ 'word' ]
}
</script>

<style>
</style>
