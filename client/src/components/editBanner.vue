<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Edit Banner" class="mt-3">
              <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
              <b-form  class="mt-3" @submit.prevent="updateBanner">
                <b-form-group label="Title :">
                  <b-form-input
                    v-model="banner.title"
                    type="text"
                    required
                    placeholder="Enter Banner Title"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Status">
                  <b-form-select
                    v-model="banner.status"
                    :options="optionsStatus"
                    required
                    value-field="status"
                    text-field="status"
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Image URL :">
                  <b-form-input
                    type="text"
                    v-model="banner.image_url"
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
  name: 'editBanner',
  data () {
    return {
      optionsStatus: [{ status: 'Activ' }, { status: 'Non Activ' }]
    }
  },
  computed: {
    banner: {
      get () {
        return this.$store.state.banner
      }
    },
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
    updateBanner () {
      this.$store.dispatch('updateBanner', this.banner)
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
  },
  created () {
    return this.$store.dispatch('editBanner', this.$route.params.id)
  }
}
</script>

<style>

</style>
