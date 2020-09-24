<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Add Banner" class="mt-3">
              <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
              <b-form  class="mt-3" @submit.prevent="addBanner">
                <b-form-group label="Title :">
                  <b-form-input
                    v-model="title"
                    type="text"
                    required
                    placeholder="Enter Banner Title"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Status">
                  <b-form-select
                    v-model="status"
                    :options="optionsStatus"
                    required
                    value-field="status"
                    text-field="status"
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Image URL :">
                  <b-form-input
                    type="text"
                    v-model="image_url"
                    required
                    placeholder="Enter Image URL"
                  ></b-form-input>
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
  name: 'addBanner',
  data () {
    return {
      title: '',
      status: '',
      image_url: '',
      optionsStatus: [{ status: 'Activ' }, { status: 'Non Activ' }]
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
    addBanner () {
      const payload = {
        title: this.title,
        status: this.status,
        image_url: this.image_url
      }

      this.$store.dispatch('addBanner', payload)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
            this.$router.push('/Home/bannerGroup')
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
