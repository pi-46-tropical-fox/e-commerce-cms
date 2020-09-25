<template>
    <div class="container">
        <ProductForm @submitForm="submitForm"/>
    </div>
</template>

<script>
import ProductForm from '../components/ProductForm'

export default {
    methods : {
        submitForm(form){
            this.$store.dispatch('createProduct', form).then(() => this.$router.push('/'))
        }
    },

    components : {
        ProductForm
    }
}
</script>
