<template>
  <div>
    <div class="grid">
      <div>
        <h3>Banner List</h3>
      </div>
      <div>
        <a href="#" @click.prevent="toggleModal">Add new Banner</a>
      </div>
    </div>

    <Table :data="data" :headers="headers" type="Banner" />

    <BannerForm :showModal="showModal" @toggleModal="toggleModal" />
  </div>
</template>

<script>
import Table from "@/components/shared/Table";
import BannerForm from "./Form";

export default {
  components: {
    Table,
    BannerForm,
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },

  data() {
    return {
      headers: [
        "Name",
        "Banner Title",
        "Banner Description",
        "Image",
        "Is Public?",
        "Action",
      ],
      showModal: false,
    };
  },

  mounted() {
    this.$store.dispatch("getBanners");
  },

  computed: {
    data() {
      return this.$store.state.bannerData;
    },
  },
};
</script>

<style>
</style>