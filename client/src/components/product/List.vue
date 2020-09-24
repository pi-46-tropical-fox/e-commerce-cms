<template>
    <div>
      <Table :data="data" :headers="headers" />
    </div>
</template>

<script>
import Form from "./Form";
import Table from "../shared/Table";

export default {
  name: "ProductList",

  components: {
      Table
  },

  data() {
    return {
      headers: [
        'Name',
        'Category',
        'Stock',
        'Price',
        'Action',
      ]
    }
  },

  computed: {
    // getters
    data: {
      get() {
        return this.$store.state.productData;
      },
    },
  },
};
</script>

<style>
</style>