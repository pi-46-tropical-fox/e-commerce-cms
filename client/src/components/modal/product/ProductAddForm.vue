<template>
  <div>
    <b-modal id="modal-1" title="Add Product" ref="add-modal" hide-footer>
      <b-form @submit.prevent="form">
        <b-form-group
          id="input-group-1"
          label="Product Name"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            required
            v-model="name"
            placeholder="Enter Name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Product Image Url"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            required
            v-model="image_url"
            placeholder="Enter Image Url"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Product Price"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            required
            type="number"
            placeholder="Enter Price"
            v-model="price"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Product Stock"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            required
            type="number"
            v-model="stock"
            placeholder="Enter Stock"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddForm",
  data() {
    return {
      name: "",
      image_url: "",
      price: "",
      stock: "",
    };
  },
  methods: {
    form() {
      let payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };

      this.$emit("productManipulate", {payload, modal : this.$refs['add-modal']} );
      setTimeout(() => {
        this.$refs['add-modal'].hide();
        this.name = '',
        this.image_url = '',
        this.price = '',
        this.stock = ''
      }, 500)
    },
  }
};
</script>

<style></style>
