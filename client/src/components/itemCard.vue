<template>
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img :src="itemData.image_url" alt="Placeholder image">
            </figure>
            <div class="card-image-popup">
                <a class="delete is-small" v-on:click="deleteData(itemData.id)"></a>
            </div>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">{{ itemData.name }}</p>
                </div>
            </div>
            <div class="content">
              <p>Price: Rp. {{ itemData.price }}</p>
              <p>Stock: {{ itemData.stock }}</p>
            </div>
            <button class="button" v-on:click="showModal">Edit</button>
        </div>
        <form class="modal is-active" v-if="modal" v-on:submit.prevent="updateData(itemData.id)">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update</p>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" v-model="name = itemData.name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Image Url</label>
                        <div class="control">
                            <input class="input" type="text" name="" v-model="image_url = itemData.image_url">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Price</label>
                        <div class="control">
                            <input class="input" type="text" name="" v-model="price = itemData.price">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Stock</label>
                        <div class="control">
                            <input class="input" type="text" name="" v-model="stock = itemData.stock">
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button type="submit" class="button is-success">Save changes</button>
                    <a class="button" v-on:click="closeModal">Cancel</a>
                </footer>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['itemData'],
  data () {
    return {
      modal: false,
      name: '',
      image_url: '',
      price: '',
      stock: ''
    }
  },
  methods: {
    showModal () {
      this.modal = true
      this.$emit('getProductData')
    },
    closeModal () {
      this.modal = false
    },
    updateData (id) {
      this.modal = false
      const data = {
        id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$emit('updateItem', data)
    },
    deleteData (id) {
        this.$emit('deleteItem', id)
    }
  },
  created () {
    this.modal = false
  }
}
</script>

<style>

</style>
