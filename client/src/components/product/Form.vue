<template>
  <div class="modal" :class="showModal ? '' : 'opacity-0 pointer-events-none'">
    <div class="modal-overlay" @click.prevent="toggleModal"></div>
    <div class="modal-container" id="form-wrapper">
      <!-- Close -->
      <div class="modal-close" @click.prevent="toggleModal">
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Body -->
      <div class="modal-content">
        <form id="form" @submit.prevent="submit">
          <!-- Title -->
          <div class="modal-title">
            <span class="title">Add New Product</span>
          </div>

          <!-- Hidden Content(s) -->

          <!-- Content -->
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="name" placeholder="Product Name" />
          </div>
          <div class="form-group">
            <label for="name">Price</label>
            <input type="number" v-model="price" placeholder="Price" />
          </div>
          <div class="form-group">
            <label for="name">Stock</label>
            <input type="number" v-model="stock" placeholder="Stock" />
          </div>
          <div class="form-group">
            <label for="name">Images</label>
            <input
              type="text"
              v-for="(image, i) in images"
              :key="i"
              v-model="images[i]"
              :placeholder="`Image URL #${i}`"
            />
            <a
              href="#"
              class="btn hover:border-gray-600 hover:text-gray-600 text-gray-700 border-gray-700 border-2"
              @click.prevent="addMore"
              >Add more</a
            >
          </div>
          <div class="form-group">
            <label for="name">Category</label>
            <v-select
              v-model="CategoryId"
              :reduce="(category) => category.code"
              :options="categories"
            ></v-select>
          </div>
          <hr />

          <!-- Footer -->
          <div class="modal-footer">
            <input class="btn info" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from '@/config/swal';
import axios from '@/config/axios'
export default {
  name: "NewProduct",

  props: {
    showModal: Boolean,
  },

  data() {
    return {
      name: "",
      price: "",
      stock: "",
      images: [""],
      CategoryId: "",
    };
  },

  components: {},

  computed: {
    categories() {
      let categories = !!this.$store.state.categoryData ? this.$store.state.categoryData.map((category) => {
        return { code: category.id, label: category.name };
      }) : [];
      return categories;
    },
  },

  methods: {
    submit() {
      let payload = {
        name: this.name,
        price: this.price,
        stock: this.stock,
        images: this.images,
        CategoryId: this.CategoryId,
      };
      
      axios({
        url: '/products',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          this.name = "";
          this.price = "";
          this.stock = "";
          this.images = [];
          this.CategoryId = "";

          swal.showToastSuccess(data.message)

          this.$store.dispatch('getProducts')

          this.toggleModal()
        })
        .catch(({response}) => {
          swal.showSwalError(response.data.join('<br>'))
        })
    },

    addMore() {
      this.images.push("");
    },

    toggleModal() {
      this.$emit("toggleModal");
    },
  },

  created() {
    this.$store.dispatch("getCategories");
  },

  mounted() {
  },
};
</script>

<style>
</style>