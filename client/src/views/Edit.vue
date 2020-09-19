<template>
<div>
    <Navbar></Navbar>
<div class="container">
        <form id="form-add" style="max-width: 60%;" class="mx-auto" @submit.prevent="editProduct">
            <h1 class="display-1">Edit</h1>
            <div class="form-group">
                <label for="product-name">Name</label>
                <input type="text" class="form-control" id="product-name" v-model="name">
            </div>
            <div class="form-group">
                <label for="product-price">Price</label>
                <input type="text" class="form-control" id="product-price" v-model="price">
            </div>
            <div class="form-group">
                <label for="product-qty">Stock</label>
                <input type="text" class="form-control" id="product-qty" v-model="stock">
            </div>
            <div class="form-group">
                <label for="product-img">Image URL</label>
                <input type="text" class="form-control" id="product-img" v-model="image_url">
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
    data() {
        return {
            name: '',
            price: 0,
            stock: 0,
            image_url: ''
        }
    },
    components: {
        Navbar
    },
    methods: {
        editProduct() {
            this.$store.dispatch('editProducts',{
                id: this.$route.params.id,
                name: this.name,
                price: this.price,
                stock: this.stock,
                image_url: this.image_url
            })
            .then(() => {
                this.$router.push('/')
            })
        },
        populateForm() {
            this.name = this.product.name
            this.price = this.product.price
            this.stock = this.product.stock
            this.image_url = this.product.image_url
        }
    },
    computed: {
        product() {
            return this.$store.state.productById
        }
    },
    created() {
        console.log(this.$route.params.id, '<< route params id');
        console.log(this.$store.state.productById)
        this.$store.dispatch('getByIdProducts', this.$route.params.id)
        .then(()=>{
            this.populateForm()
        })
    }
    
};
</script>