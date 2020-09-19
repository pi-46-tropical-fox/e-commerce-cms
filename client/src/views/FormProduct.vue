<template>
<!-- Add Product page START -->
    <div class="addPage">
        <div class="addForm">
            <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
            <h4>Product</h4>
            <hr>
            <!-- add form -->
            <form v-if="setStatus" @submit.prevent="addProduct">
                <div class="form-group">
                    <label for="name">Product's Name</label>
                    <input
                    v-model="name"
                    type="text"
                    class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <input
                    v-model="image_url"
                    type="text"
                    class="form-control">
                </div>
                <div class="form-group">
                    <label for="category">Category</label><br>
                    <select v-model="category" name="category" id="category">
                    <option value="select" selected disabled>--select category--</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Game">Game</option>
                    <option value="Book">Book</option>
                    <option value="Voucher">Voucher</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="Gadget & Electronic">Gadget & Electronic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input
                    v-model="price"
                    type="number"
                    class="form-control" id="price">
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input
                    v-model="stock"
                    type="number"
                    class="form-control" id="stock">
                </div>
                <div class="form-group">
                    <label for="BannerId">Set Banner</label><br>
                    <select v-model="BannerId" name="BannerId" id="BannerId">
                    <option value="select" selected disabled>--select banner--</option>
                    <option v-for="(banner, index) in $store.state.banners" :key="index"
                    :value=banner.id>{{banner.name}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
                <router-link :to="{name: 'ProductTable'}">
                  <button type="button" class="ml-2 btn btn-secondary">Cancel</button>
                </router-link>
            </form>
            <!-- edit form -->
            <form v-else @submit.prevent="editProduct">
                <div class="form-group">
                    <label for="name">Product's Name</label>
                    <input
                    v-model="name"
                    type="text"
                    class="form-control" id="name" placeholder="Komik Conan 1">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    id="image_url" placeholder="http://image.jpg">
                </div>
                <div class="form-group">
                    <label for="category">Category</label><br>
                    <select v-model="category" name="category" id="category">
                    <option value="select" selected disabled>--select category--</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Game">Game</option>
                    <option value="Book">Book</option>
                    <option value="Voucher">Voucher</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="Gadget & Electronic">Gadget & Electronic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input
                    v-model="price"
                    type="number"
                    class="form-control" id="price" placeholder="10000">
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input
                    v-model="stock"
                    type="number"
                    class="form-control" id="stock" placeholder="10">
                </div>
                <div class="form-group">
                    <label for="BannerId">Set Banner</label><br>
                    <select v-model="BannerId" name="BannerId" id="BannerId">
                    <option value="select" selected disabled>--select banner--</option>
                    <option v-for="(banner, index) in $store.state.banners" :key="index"
                    :value=banner.id>{{banner.name}}</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Edit</button>
                <router-link :to="{name: 'ProductTable'}">
                  <button type="button" class="ml-2 btn btn-secondary">Cancel</button>
                </router-link>
            </form>
        </div>
    </div>
<!-- Add Product END -->
</template>

<script>
export default {
  name: 'FormProduct',
  data () {
    return {
      addForm: true,
      addName: '',
      addImage: '',
      addPrice: 0,
      addStock: 0,
      addCategory: 'select',
      addBannerId: 0
    }
  },
  created () {
    this.$store.dispatch('showBanners')
  },
  computed: {
    setStatus () {
      return this.$store.state.statusAdd
    },
    name: {
      get () {
        this.addName = this.$store.state.product.name
        return this.$store.state.product.name
      },
      set (newName) {
        this.addName = newName
      }
    },
    image_url: {
      get () {
        this.addImage = this.$store.state.product.image_url
        return this.$store.state.product.image_url
      },
      set (newImage) {
        this.addImage = newImage
      }
    },
    price: {
      get () {
        this.addPrice = this.$store.state.product.price
        return this.$store.state.product.price
      },
      set (newPrice) {
        this.addPrice = newPrice
      }
    },
    stock: {
      get () {
        this.addStock = this.$store.state.product.stock
        return this.$store.state.product.stock
      },
      set (newStock) {
        this.addStock = newStock
      }
    },
    category: {
      get () {
        this.addCategory = this.$store.state.product.category || 'select'
        return this.$store.state.product.category || 'select'
      },
      set (newCategory) {
        this.addCategory = newCategory
      }
    },
    BannerId: {
      get () {
        this.addBannerId = this.$store.state.product.BannerId || 'select'
        return this.$store.state.product.BannerId || 'select'
      },
      set (newBannerId) {
        this.addBannerId = newBannerId
      }
    }
  },
  methods: {
    addProduct () {
      const newProduct = {
        name: this.addName,
        image_url: this.addImage,
        price: this.addPrice,
        stock: this.addStock,
        category: this.addCategory,
        BannerId: this.addBannerId
      }
      this.$store.dispatch('addProduct', newProduct)
    },
    editProduct () {
      const updatedProduct = {
        name: this.addName,
        image_url: this.addImage,
        price: this.addPrice,
        stock: this.addStock,
        category: this.addCategory,
        id: this.$store.state.product.id,
        BannerId: this.addBannerId
      }
      this.$store.dispatch('editProduct', updatedProduct)
    }
  }
}
</script>

<style>

</style>
