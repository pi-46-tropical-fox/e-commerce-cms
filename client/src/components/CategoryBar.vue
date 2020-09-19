<template>

    <button class="list-group-item">
      {{category.name}}
    </button>

</template>

<script>
export default {
  name: 'CategoryBar',
  props: ['category'],
  methods: {
    selectCategory () {
      console.log('masuk pak eeko')
    }
  }
}
</script>

<style>

</style>
