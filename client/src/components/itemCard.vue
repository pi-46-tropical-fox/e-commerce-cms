<template>
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img :src="itemData.image_url" alt="Placeholder image">
            </figure>
            <div class="card-image-popup">
                <a class="delete is-small" v-on:click.prevent="deleteData(itemData.id)"></a>
            </div>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-5">{{ itemData.name }}</p>
                </div>
            </div>
            <div class="content">
              <p>Price: {{ itemData.price.toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</p>
              <p>Stock: {{ itemData.stock }}</p>
            </div>
            <button class="button" @click="selectData(itemData.id)">Edit</button>
        </div>
        <Modal v-if="modal"
         :itemData="itemData"
         @closeModal="closeModal"
        ></Modal>
    </div>
</template>

<script>
import Modal from './modal'

export default {
  name: 'Card',
  components: {
    Modal
  },
  props: ['itemData'],
  data () {
    return {
      modal: false
    }
  },
  methods: {
    closeModal () {
      this.modal = false
    },
    selectData (id) {
      this.$store.dispatch('fetchData', id)
      this.$router.push({ path: `/products/${id}` })
    },
    async deleteData (id) {
      await this.$store.dispatch('deleteProduct', id)
    }
  },
  created () {
    this.modal = false
  }
}
</script>

<style>

</style>
