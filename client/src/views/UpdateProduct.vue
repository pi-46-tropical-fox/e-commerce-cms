<template>
    <div>
        <h1>Edit product</h1>
        <div class="row">
            <div class="col">
                <ProductItem :noLinks="true" :data="product"/>
                <ProductForm @submitForm="submitForm" :name="product.name" :image_url="product.image_url" :price="product.price" :stock="product.stock" :update="true"/>
            </div>
        </div>
    </div>
</template>


<script>
import ProductForm from '../components/ProductForm.vue'
import ProductItem from '../components/ProductItem.vue'

export default {
    components : {
        ProductForm,
        ProductItem
    },
    computed: {
        product(){
            return this.$store.state.singleProduct
        }
    },
    methods : {
        submitForm(data){
            this.$store.dispatch('updateById', { ...data, id: this.product.id }).then(() => {
                this.$router.push('/')
            }).catch(err => {
                this.$swal.fire(err.data)
            })
        }
    },
    created(){
        this.$store.dispatch('fetchProductById', this.$route.params.id)
    }
}
</script>
