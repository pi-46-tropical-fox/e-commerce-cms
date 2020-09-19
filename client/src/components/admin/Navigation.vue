<template>
  <div id="navigation">
    <h2>Dasboard</h2>
    <b-button variant="info" id="logout-button" @click="logout">Logoout</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push({ path: "/admin/login" });
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Successfully logged out`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
};
</script>

<style scoped>
#navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: rgb(112, 112, 112);
  padding: 1px 20px;
  width: 100%;
}
#logout-button {
  padding: 2px 5px;
}
h2{
  padding:2px;
  margin:0;
  color: rgb(238, 238, 238);
}
</style>