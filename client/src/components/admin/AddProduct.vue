<template>
  <div id="add-product">
    <b-form @submit.prevent="addItem" id="the-form">
      <b-input placeholder="Name" v-model="name"></b-input>
      <b-input placeholder="Image URL" v-model="imageUrl"></b-input>
      <b-input placeholder="Price" type="number" v-model="price"></b-input>
      <b-input placeholder="Stock" type="number" v-model="stock"></b-input>
      <b-form-select v-model="selected" :options="category"></b-form-select>
      <b-input placeholder="Description" type="text" v-model="desc"></b-input>
      <b-button type="submit" variant="info" id="login-button" >Create</b-button>
      <br />
      <b-button @click.prevent="back" type="submit" variant="dark" id="login-button">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      selected: null,
      category: [
        { value: null, text: "Category" },
        { value: "smartphone", text: "smartphone" },
        { value: "tablet", text: "tablet" },
        { value: "laptop", text: "laptop" }
      ],
      name:'',
      imageUrl:'',
      price:'',
      stock:'',
      desc:''
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/admin/dashboard" });
    },
    addItem(){
      let data = {
        name: this.name,
        image_url: this.imageUrl,
        price:this.price,
        stock: this.stock,
        category:this.selected,
        description: this.desc
      }
      this.$store.dispatch('addData',data)
      this.$router.push({ path: "/admin/dashboard" });
      this.name='';
      this.imageUrl='';
      this.price='';
      this.stock='';
      this.desc='';
      this.selected = null;
    }
  }
};
</script>

<style scoped>
#add-product {
  margin:5px auto;
  text-align: center;
}
input,
textarea,
button,
select {
  margin: 5px auto;
  width: 200px;
}
#the-form{
  margin: auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}
</style>