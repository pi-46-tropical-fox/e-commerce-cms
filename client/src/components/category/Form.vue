<template>
  <div class="modal" :class="showModal ? '' : 'opacity-0 pointer-events-none'">
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
            <span class="title">Add New Category</span>
          </div>

          <!-- Hidden Content(s) -->
          <input type="hidden" name="todoId" class="todoId" value />

          <!-- Content -->
          <div class="form-group">
            <label for="name">Category Name</label>
            <input type="text" v-model="name" placeholder="Name" />
          </div>
          <div class="form-group">
            <label for="name">Category Description</label>
            <input
              type="text"
              v-model="description"
              placeholder="Description"
            />
          </div>
          <hr />

          <!-- Footer -->
          <div class="modal-footer">
            <input
              id="submitTodo"
              class="btn info"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewCategory",

  props: {
    showModal: Boolean,
  },

  data() {
    return {
      name: "",
      description: "",
    };
  },

  components: {},

  methods: {
    async submit() {
      let payload = {
        name: this.name,
        description: this.description,
      };

      await this.$store.dispatch("createCategory", payload);

      this.name = "";
      this.description = "";

      this.toggleModal();
    },

    toggleModal() {
      this.$emit("toggleModal");
    },
  },

  created() {
  },

  mounted() {
  },
};
</script>

<style>
</style>