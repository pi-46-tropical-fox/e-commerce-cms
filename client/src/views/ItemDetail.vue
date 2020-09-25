<template>
  <div>
    <div class="card item-detail">
      <div class="item-detail-image">
        <img :src='itemData.image_url' alt="">
      </div>
      <div class="card-body">
        <div v-if="isEdit === false">
          <h3 class="card-title">{{itemData.name}}</h3>
          <h5 class="card-text">Rp. {{priceConverted}}</h5>
          <h6 class="card-text"><small class="text-muted">{{itemData.stock}} pcs</small></h6>
        </div>
        <div v-if="isEdit===true">
          <!-- <label for="name">Game Title</label> -->
          <br>
          <input class="item-detail-input name" type="text" v-model="itemData.name">

          <br>

          <!-- <label for="price">Price</label> -->
          <br>
          <input class="item-detail-input price" type="number" v-model="itemData.price">

          <br>

          <!-- <label for="stock">Stock</label> -->
          <br>
          <input class="item-detail-input stock" type="number" v-model="itemData.stock">

          <br><br>

          <select  class="item-detail-input category-id" name="category" v-model='itemData.CategoryId'>
            <option  v-for="category in categoriesData" :key="category.id" :value="category.id">{{category.name}}</option>
          </select>

          <br><br>

          <button class="btn btn-warning" @click.prevent="submitEdit" >Submit</button>
          <button class="btn btn-warning" @click.prevent="toggleStartEdit">Back</button>
        </div>
        <br>
        <div class="item-detail-button" v-if="isEdit === false">
          <button class="btn btn-warning" @click.prevent='toggleStartEdit'>Edit</button> |
          <button class="btn btn-warning" @click.prevent="deleteItem">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemDetail',
  data () {
    return {
      isEdit: false
    }
  },
  computed: {
    itemData: {
      get () {
        return this.$store.state.onDisplayData
      }
    },

    categoriesData () {
      return this.$store.state.categoriesData
    },

    priceConverted () {
      const price = String(this.itemData.price).split('')
      const result = []
      let j = price.length
      for (let i = 0; i <= price.length; i++) {
        result.unshift(price[j])
        j -= 1
        if (i % 3 === 0 && i !== 0 && i !== price.length) {
          result.unshift('.')
        }
      }
      return result.join('')
    }
  },
  methods: {
    toggleStartEdit () {
      if (this.isEdit) {
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    submitEdit () {
      const payload = {
        id: this.itemData.id,
        	name: this.itemData.name,
        image_url: this.itemData.image_url,
        price: this.itemData.price,
        stock: this.itemData.stock,
        CategoryId: this.itemData.CategoryId
      }
      console.log(payload)
      this.$store.dispatch('editData', payload)
    },
    deleteItem () {
      const payload = {
        id: this.itemData.id
      }
      this.$store.dispatch('deleteItem', payload)
      this.$router.push({ name: 'ProductList', id: this.itemData.CategoryId })
    }
  }
}
</script>

<style>

</style>
