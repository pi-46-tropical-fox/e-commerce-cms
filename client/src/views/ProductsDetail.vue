<template>
    <div>
        <section class="hero is-light">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        Product Detail
                    </h1>
                </div>
            </div>
        </section>
        <section class="section is-fluid">
            <div class="container">
                <article class="media">
                    <figure class="media-left">
                        <img class="product-image" :src="product.image_url" />
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <h1 class="title">{{ product.name }}</h1>
                            <p class="subtitle is-4" v-if="product.Category">
                                Category:
                                {{ product.Category.name }}
                            </p>
                            <p>Rp. {{ product.price }}</p>
                            <p>In stock: {{ product.stock }}</p>
                            <p>
                                Upload Date:
                                {{ new Date(product.createdAt) }}
                            </p>
                            <a
                                class="button is-link"
                                @click="showUpdateProductForm"
                                >Update</a
                            >
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <div class="modal" :class="{ 'is-active': isShowUpdateProductForm }">
            <div
                class="modal-background"
                @click="destroyUpdateProductForm"
            ></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title has-text-centered">Update Product</h1>
                    <form @submit.prevent="updateProductForm">
                        <div class="field">
                            <label class="label" for="name">Name</label>
                            <div class="control">
                                <input
                                    v-model="productToUpdate.name"
                                    id="name"
                                    class="input"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <img
                                    width="200px"
                                    :src="productToUpdate.image_url"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" for="image_url"
                                >Image Url</label
                            >
                            <div class="control">
                                <input
                                    v-model="productToUpdate.image_url"
                                    id="image_url"
                                    class="input"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" for="price">Price</label>
                            <div class="control">
                                <input
                                    v-model="productToUpdate.price"
                                    id="price"
                                    class="input"
                                    type="number"
                                />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" for="stock">Stock</label>
                            <div class="control">
                                <input
                                    v-model="productToUpdate.stock"
                                    id="stock"
                                    class="input"
                                    type="number"
                                />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Category</label>
                            <div class="control">
                                <CategoryList
                                    @on-item-selected="
                                        selectedCategory = $event
                                    "
                                    @on-item-reset="selectedCategory = {}"
                                ></CategoryList>
                            </div>
                        </div>

                        <div class="field is-grouped is-grouped-centered">
                            <div class="control">
                                <button type="submit" class="button is-primary">
                                    Submit
                                </button>
                            </div>
                            <div class="control">
                                <a
                                    class="button is-danger is-light"
                                    @click="destroyUpdateProductForm"
                                    >Cancel</a
                                >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <button
                class="modal-close is-large"
                aria-label="close"
                @click="destroyUpdateProductForm"
            ></button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CategoryList from '@/components/CategoryList.vue';
import Swal from 'sweetalert2';

export default {
    name: 'ProductsDetail',

    components: { CategoryList },

    data() {
        return {
            isShowUpdateProductForm: false,
            selectedCategory: {},
            productToUpdate: {},
        };
    },

    methods: {
        ...mapActions([
            'fetchProductsById',
            'fetchCategories',
            'updateProduct',
        ]),

        showUpdateProductForm() {
            this.isShowUpdateProductForm = true;
            this.productToUpdate = { ...this.product };
            this.selectedCategory = this.productToUpdate.Category;
        },

        destroyUpdateProductForm() {
            this.isShowUpdateProductForm = false;
            this.productToUpdate = { ...this.product };
            this.selectedCategory = {};
        },

        updateProductForm() {
            this.productToUpdate.Category = { ...this.selectedCategory };
            this.productToUpdate.CategoryId = this.selectedCategory.id;
            this.updateProduct(this.productToUpdate)
                .then(() => {
                    this.destroyUpdateProductForm();
                    this.fetchProductsById(this.$route.params);
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        html: err.response.data.errors
                            .map(err => err.message)
                            .join('<br />'),
                    });
                });
        },
    },

    computed: {
        ...mapState({
            product: state => state.productDetail,
        }),
    },

    created() {
        this.fetchCategories();
        this.fetchProductsById(this.$route.params);
    },
};
</script>

<style></style>
