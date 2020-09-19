<template>
  <div>
    <b-form @submit.prevent="editForm">
      <b-form-group
        id="input-group-1"
        label="Product Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="product.name"
          type="text"
          required
          placeholder="Enter Product"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Image URL:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="product.image_url"
          required
          placeholder="Enter Image URL"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Stock :" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="product.stock"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Price :" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="product.price"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Category:" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="product.category"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "editForm",
  data() {
    return {
      categories: [
        { value: null, text: "Please select an option" },
        { value: "shirt", text: "Shirts" },
        { value: "hoodie", text: "Hoodies" },
        { value: "jeans", text: "Jeans" },
        { value: "accesories", text: "Accesories" }
      ],
      product: {},
    };
  },
  methods: {
    fetch() {
      return this.$store.dispatch('findId', this.$route.params.id);
    },
    editForm() {
      const id = this.$route.params.id
      const payload = {
        name: this.product.name,
        image_url: this.product.image_url,
        price: this.product.price,
        stock: this.product.stock,
        category: this.product.category
      }
      this.$store.dispatch('editProduct', {payload, id})
    }
  },
  created() {
    this.fetch();
  },
  computed: {
    selectData() {
      this.product = this.$store.state.getId;
    }
  }
};
</script>

<style></style>
