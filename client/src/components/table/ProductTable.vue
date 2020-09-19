<template>
  <div class="container-1 shadow">
    <div>
      <img :src="product.image_url" alt="image" class="image-product shadow" />
    </div>
    <div>
      <h3>{{ product.name }}</h3>
      <div class="desc">
        <h6 style="color:green;">$. {{ product.price.toLocaleString() }} ,</h6>
        <h6>Stock: {{ product.stock }} Left</h6>
      </div>
      <div class="desc">
        <a href="#" v-on:click="editProducts(product.id)" v-b-modal.modal-2>Edit</a>
        <a href="#" v-on:click="deleteProducts(product.id)">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    deleteProducts(id) {
      this.$emit("delete", id);
    },
    editProducts(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
.container-1 {
  display: flex;
  margin: 1em 1em 1em 0;
}

.image-product {
  width: 10em;
  margin-right: 2em;
}

.desc {
  display: flex;
  flex-wrap: wrap;
}

.desc h6 {
  margin: 0.3em;
}

.desc a {
  margin: 0.3em;
}
</style>
