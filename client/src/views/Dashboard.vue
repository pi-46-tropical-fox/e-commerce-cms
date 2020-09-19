<template>
    <div>
        <router-link to="/product/add">
            <button class="btn btn-primary">Add Product</button>
        </router-link>

        <table>
            <thead>
                
            </thead>
            
            <tbody>
                <ProductItem v-for="product in products" :key="product.id" :data="product"/>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductItem from '../components/ProductItem'

export default {
    components : {
        ProductItem
    },
    created(){
        this.$store.dispatch('fetchProducts')
    },
    methods:{
        addProduct(){
            this.$router.push('/product/add')
        }
    },
    computed:mapState({
        products : state => state.products
    })
}
</script>