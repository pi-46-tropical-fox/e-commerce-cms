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
                            <p class="subtitle is-4">
                                Category:
                                {{
                                    categories.filter(
                                        el => el.id === product.CategoryId
                                    )[0].name
                                }}
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
            <div
                class="modal"
                :class="{ 'is-active': isShowUpdateProductForm }"
            >
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
                                        v-model="product.name"
                                        id="name"
                                        class="input"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label" for="image_url"
                                    >Image Url</label
                                >
                                <div class="control">
                                    <input
                                        v-model="product.image_url"
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
                                        v-model="product.price"
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
                                        v-model="product.stock"
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
                                    <button
                                        type="submit"
                                        class="button is-primary"
                                    >
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
        </section>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CategoryList from '@/components/CategoryList.vue';

export default {
    name: 'ProductsDetail',

    components: { CategoryList },

    data() {
        return {
            product: {},
            isShowUpdateProductForm: false,
            selectedCategory: {},
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
        },

        destroyUpdateProductForm() {
            this.isShowAddProductForm = false;
            this.selectedCategory = {};
        },
    },

    computed: {
        ...mapState(['categories']),
    },

    created() {
        this.fetchCategories();
        this.fetchProductsById(this.$route.params)
            .then(({ data }) => {
                this.product = data;
            })
            .catch(err => {
                console.log(err);
            });
    },
};
</script>

<style></style>
