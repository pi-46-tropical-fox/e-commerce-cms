<template>
    <div id="addpage">
        <div class="add">
            <h1>Add Product</h1>
            <div class="d-flex justify-content-center">
                <form @submit.prevent="submitProduct">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="image_url">Image Url</label>
                        <input type="text" class="form-control" v-model="image_url">
                    </div>
                        <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" class="form-control" v-model="price">
                    </div>
                        <div class="form-group">
                        <label for="stock">Stock</label>
                        <input type="number" class="form-control" v-model="stock">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddProduct',
    data () {
        return {
            name: '',
            image_url: '',
            price: '',
            stock: ''
        }
    },
    methods: {
        submitProduct () {
            const data = {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            }
            this.$store.dispatch('submitProduct', data)
        }
    }
}
</script>

<style>
#addpage {
    text-align: center;
    padding: 400px;
    background-color: #fbcb4f;
    background-size: 200px;
    background-repeat: repeat;
}


.add {
    background: #FFFEFE;
    color: black;
    width: 500px;
    display: block;
    margin: 0px auto;
    padding: 70px;
    border-radius: 50px;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
} 
</style>
