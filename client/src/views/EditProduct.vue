<template>
  <div>
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Update Product</h5>
                <form @submit.prevent="submitEditProduct" class="form-updateProduct">

                    <div class="form-label-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="name" class="form-control">
                    </div>

                    <div class="form-label-group">
                        <label for="image_url">Image Url</label>
                        <input type="text" v-model="image_url" class="form-control">
                    </div><br>

                    <div class="form-label-group">
                        <label for="price">Price</label>
                        <input type="text" v-model="price" class="form-control">
                    </div>

                    <div class="form-label-group">
                        <label for="stock">Stock</label>
                        <input type="text" v-model="stock" class="form-control">
                    </div><br>

                    <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Update Product</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'EditProduct',
    data () {
        return
    }
}
</script>

<style>

</style>