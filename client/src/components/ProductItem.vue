<template>
    <div class="container mx-3 my-3">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <img class=" card-img-top" :src="data.image_url">
                <h3 class="card-title">{{data.name}}</h3>

                <h5 class="card-title">{{data.price}}</h5>
                <h6 class="card-title">Stock {{data.stock}}</h6>

                <div v-if="!noLinks">
                    <a href="#" v-on:click="deleteProduct" class="card-link">
                        Delete
                    </a>

                    <router-link :to="{ path: '/product/' + data.id + '/edit'}">
                        Edit
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : ['data', 'noLinks'],
    methods : {
        deleteProduct(){
            this.$store.dispatch('delete', this.data.id)
        }
    }
}
</script>
