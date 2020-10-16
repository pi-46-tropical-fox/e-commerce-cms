<template>
  <div class="page-wrapper">
    <Navbar></Navbar>
    <div class="container" id="cards-wrapper">

      <div class="row" style="margin-left: 150px">
        <CardBanner v-for="product in allProduct" :key="product.id"
        :product="product"></CardBanner>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import CardBanner from '../components/CardBanner'

export default {
  name: 'BannerPage',
  components: {
    Navbar,
    CardBanner
  },
  methods: {
    getBanner () {
      this.$store.dispatch('getBanner')
    }
  },
  computed: {
    allProduct () {
      return this.$store.state.allProduct
    }
  },
  mounted () {
    this.getBanner()
    if (!localStorage.access_token) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .page-wrapper
{
  /* background: rgb(49, 49, 49); */
  /* background: rgb(2, 2, 19); */
  /* background-image: url("../assets/123jg.jpeg"); */
  /* background: #f8c291; */
  background: white;
  height: 100%;
  font-weight: 100;
}

.container
{
  max-width: 85%;
}

#cards-wrapper
{
  text-align: center;
  flex-direction: row;
  /* margin: 200px 100px 0px 200px; */
  /* max-width: 80%; */
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: space-evenly; */
  /* justify-content: center; */
}
/* #cards-body {
  margin: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
} */
</style>
