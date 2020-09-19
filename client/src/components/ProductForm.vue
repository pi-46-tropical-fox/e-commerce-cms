<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label>Name</label>
            <input v-model="form.name" type="text" class="form-control" required placeholder="Name">
        </div>
        <div class="form-group">
            <label>Image URL</label>
            <input v-model="form.image_url" type="text" class="form-control" required placeholder="Image URL">
        </div>
        <div class="form-group">
            <label>Price</label>
            <input v-model="form.price" type="number" class="form-control" required placeholder="Price">
        </div>
        <div class="form-group">
            <label>Stock</label>
            <input v-model="form.stock" type="number" class="form-control" required placeholder="Stock">
        </div>
        
        <button class="btn btn-primary">Create</button>
    </form>
</template>

<script>
export default {
    props : ['name', 'image_url', 'price', 'stock'],
    methods : {
        submitForm(){
            this.$emit('submitForm', this.form)
        }
    },
    computed : {
        form(){
            return {
                name : this.name,
                image_url : this.image_url,
                price : this.price,
                stock : this.stock
            }
        }
    }
}
</script>
