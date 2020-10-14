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
              <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
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
  computed: {
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },
  methods: {
    addCategory () {
      const payload = {
        category: this.category
      }

      this.$store.dispatch('addCategory', payload)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
            this.$router.push('/Home')
          }, 2000)
        })
        .catch(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 3000)
        })
    }
  }
}
</script>

<style>

</style>
