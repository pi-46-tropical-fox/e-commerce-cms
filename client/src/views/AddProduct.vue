<template>
    <div class="container">
        <ProductForm @submitForm="submitForm"/>
    </div>
</template>

<script>
import ProductForm from '../components/ProductForm'

export default {
    data(){
        return {
            // a : 'asdads'
        }
    },
    methods : {
        submitForm(form){
            console.log(form)
            this.$store.dispatch('createProduct', form)
        }
    },

    components : {
        ProductForm
    }
}
</script>
