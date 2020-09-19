<template>
  <div>
    <b-form @submit.prevent="editItem" id="the-form" style="margin:auto; text-align:center">
      <b-input placeholder="Name" v-model="name" value></b-input>
      <b-input placeholder="Image URL" v-model="imageUrl"></b-input>
      <b-input placeholder="Price" type="number" v-model="price"></b-input>
      <b-input placeholder="Stock" type="number" v-model="stock"></b-input>
      <b-form-select v-model="selected" :options="category"></b-form-select>
      <b-input placeholder="Description" type="text" v-model="description"></b-input>
      <b-button type="submit" variant="info" id="update-button">Update</b-button>
      <br />
    </b-form>
  </div>
</template>

<script>
export default {
  name: "EditForm",
  data() {
    return {
      id: this.product.id,
      name: this.product.name,
      imageUrl: this.product.image_url,
      price: this.product.price,
      stock: this.product.stock,
      selected: this.product.category,
      description: this.product.description,
      category: [
        { value: null, text: "Category" },
        { value: "smartphone", text: "smartphone" },
        { value: "tablet", text: "tablet" },
        { value: "laptop", text: "laptop" }
      ]
    };
  },
  props: ["product"],
  methods: {
    editItem() {
      let data = {
        id: this.id,
        name: this.name,
        image_url: this.imageUrl,
        price: this.price,
        stock: this.stock,
        category: this.selected,
        description: this.description
      };
      this.$store.dispatch("editData", data);
      this.$router.push({ path: "/admin/dashboard" })
    }
  }
};
</script>

<style scoped>
input,
select {
  margin: 5px auto;
  width: 300px;
}
</style>