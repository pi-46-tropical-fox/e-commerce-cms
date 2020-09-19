<template>
      <!-- <router-link to="/">Home</router-link> -->
    <div>
        <router-link to="/product/add">
            <button class="btn btn-primary">Add Product</button>
        </router-link>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('fetchProducts')
    },
    methods:{
        addProduct(){
            this.$router.push('/product/add')
        }
    }
}
</script>