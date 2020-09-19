<template>
    <form class="modal is-active" @submit.prevent="formData">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add Product</p>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="name">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Image Url</label>
                    <div class="control">
                        <input class="input" type="text" v-model="image_url">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Price</label>
                    <div class="control">
                        <input class="input" type="text" v-model="price">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Stock</label>
                    <div class="control">
                        <input class="input" type="text" v-model="stock">
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button type="submit" class="button is-success">Save</button>
                <a class="button" v-on:click="closeModal">Cancel</a>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    formData () {
      const data = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$emit('addProduct', data)
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>

</style>
