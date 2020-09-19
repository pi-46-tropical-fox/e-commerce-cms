<template>
  <tr>
    <th scope="row">{{id+1}}</th>
    <td class="w-25">
      <img :src="banner.title" class="img-fluid img-thumbnail" alt="Banners Image" />
    </td>
    <td>{{banner.category}}</td>
    <td>{{banner.status}}</td>
    <td>
      <a @click.prevent="toEditPage" class="btn btn-2">Edit</a>
      <a @click.prevent="deleteBanner" class="btn btn-3">Delete</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'RowBanner',
  props: ['banner', 'id'],
  methods: {
    deleteBanner () {
      console.log('masuk di delete', this.banner.id)
      this.$store.dispatch('deleteBanner', this.banner.id).then(() => {
        this.$store.dispatch('fetchBanners')
      })
    },
    toEditPage () {
      this.$store.dispatch('selectBanner', this.banner.id).then(() => {
        this.$router.push(`/editBanner/${this.banner.id}`)
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 2rem 0rem;
}

h4 {
  margin: 2rem 0rem 1rem;
}

.table-image td,
.table-image th {
  vertical-align: middle;
}

/*BUTTON*/
* {
  box-sizing: inherit;
  -webkit-transition-property: all;
  transition-property: all;
  -webkit-transition-duration: 0.6s;
  transition-duration: 0.6s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}

.buttons {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  width: 50%;
}

.btn {
  color: #fff;
  cursor: pointer;
  font-size: 10px;
  font-weight: 200;
  line-height: 30px;
  margin: 0 0 2em;
  max-width: 80px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
}
@media (min-width: 60px) {
  .btn {
    margin: 0 1em 2em;
  }
}
.btn:hover {
  text-decoration: none;
}

.btn-3 {
  background: #e3403a;
  border: 1px solid #da251f;
  box-shadow: 0px 2px 0 #d6251f, 2px 4px 6px #e02a24;
  font-weight: 900;
  letter-spacing: 1px;
  -webkit-transition: all 150ms linear;
  transition: all 150ms linear;
}

.btn-3:hover {
  background: #e02c26;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2);
  color: #ec817d;
  text-decoration: none;
  text-shadow: -1px -1px 0 #c2211c;
  -webkit-transition: all 250ms linear;
  transition: all 250ms linear;
}

.btn-2 {
  background: #353030;
  border: 1px solid #353030;
  box-shadow: 0px 2px 0 #353030, 2px 4px 6px #353030;
  font-weight: 900;
  letter-spacing: 1px;
  -webkit-transition: all 150ms linear;
  transition: all 150ms linear;
}
</style>
