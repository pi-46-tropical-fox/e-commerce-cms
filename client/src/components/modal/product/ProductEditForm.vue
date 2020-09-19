<template>
  <div>
    <b-modal id="modal-2" title="Edit Product" ref="edit-modal" hide-footer>
      <b-form @submit.prevent="form">
        <b-form-group
          id="input-group-1"
          label="Product Name"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            required
            v-model="detailProduct.name"
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
            v-model="detailProduct.image_url"
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
            v-model="detailProduct.price"
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
            v-model="detailProduct.stock"
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
  name: "EditForm",
  props: ['detailProduct'],
  methods: {
    form() {
      this.$emit("editProduct", this.$refs['edit-modal'] );
    },
  },
};
</script>

<style></style>
