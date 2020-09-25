<template>
  <div class="modal" :class="showModal ? '' :  'opacity-0 pointer-events-none'">
    <div class="modal-overlay" @click.prevent="toggleModal"></div>
    <div class="modal-container" id="todo-form-wrapper">
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
        <form id="todo-form" @submit.prevent="submit">
          <!-- Title -->
          <div class="modal-title">
            <span class="title">Add New Product</span>
          </div>

          <!-- Hidden Content(s) -->
          <input type="hidden" name="todoId" class="todoId" value />

          <!-- Content -->
      <div class="form-group">
        <input type="text" v-model="name" placeholder="Name" />
      </div>
      <div class="form-group">
        <input type="text" v-model="banner_title" placeholder="Banner Title" />
      </div>
      <div class="form-group">
        <input type="text" v-model="banner_description" placeholder="Banner Description" />
      </div>
      <div class="form-group">
        <input type="text" v-model="image_url" placeholder="Image" />
      </div>
      <div class="form-group">
        <label for="status">Published?</label>
        <input type="radio" v-model="status" value="true"> Yes
        <input type="radio" v-model="status" value="false"> No
      </div>
          <hr />

          <!-- Footer -->
          <div class="modal-footer">
            <input id="submitTodo" class="btn info" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewBanner",

  props: {
    showModal: Boolean
  },

  data(){
    return {
      name: '',
      banner_title: '',
      banner_description: '',
      status: '',
      image_url: '',
    }
  },

  components: {
  },

  methods: {
    submit(){
      let payload = {
        name: this.name,
        price: this.price,
        stock: this.stock,
        category: this.category,
      }
        
      this.$store.dispatch('createBanner', payload)
    },

    toggleModal(){
      this.$emit('toggleModal')
    },
  },
};
</script>

<style>
</style>