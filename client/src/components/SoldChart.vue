<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
export default {
  name: 'SoldChart',
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, options)
  }

}
</script>

<style>

</style>
