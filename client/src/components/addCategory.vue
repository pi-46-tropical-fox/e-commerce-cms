<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Add Category" class="mt-3">
              <b-form  class="mt-5" @submit.prevent="addCategory">
                <b-form-group label="Category :">
                  <b-form-input
                    v-model="category"
                    type="text"
                    required
                    placeholder="Enter Category Name"
                  >
                  </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'addCategory',
  data () {
    return {
      category: ''
    }
  },

  methods: {
    addCategory () {
      const payload = {
        category: this.category
      }

      this.$store.dispatch('addCategory', payload)
    }
  }
}
</script>

<style>

</style>
