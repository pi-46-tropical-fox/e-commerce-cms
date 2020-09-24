<template>
  <div class="bannerItem">
    <div>
      <img class="banner" :src="banner.image_url" alt="banner" srcset="">
    </div>
    <div class="detailBanner">
      <h3>{{banner.title}}</h3>
      <span class="mt-3 mb-3">{{banner.status}}</span>
      <div>
        <router-link class="btn btn-primary mr-3" :to="`/Home/editBanner/${banner.id}`" >Edit</router-link>
        <b-button href="#" variant="danger" @click.prevent="deleteBanner">Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'banner',
  props: ['banner'],
  methods: {
    deleteBanner () {
      this.$store.dispatch('deleteBanner', this.banner)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
            this.$router.push('/Home/bannerGroup')
          }, 2000)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style>
.bannerItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border:solid grey;
}

.banner {
  height: 250px;
  width: 800px;
}

.detailBanner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:300px;
}

</style>
