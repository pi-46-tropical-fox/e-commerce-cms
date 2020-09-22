<template>
    <div>
        <section class="hero is-light">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        Products
                    </h1>
                    <a @click="showAddProductForm" class="button is-link">
                        Add Product
                    </a>
                </div>
            </div>
        </section>
        <section class="section is-fluid">
            <input
                class="input mb-4"
                type="text"
                v-model="search"
                placeholder="Search product.."
            />
            <table
                class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in filteredProducts" :key="product.id">
                        <th>
                            <img
                                class="product-image"
                                :src="product.image_url"
                            />
                        </th>
                        <th>{{ product.name }}</th>
                        <th>{{ product.price }}</th>
                        <th>{{ product.stock }}</th>
                        <th>{{ product.Category.name }}</th>
                        <th>
                            <a
                                class="button mr-3"
                                @click="goToDetail(product.id, product.slug)"
                            >
                                Detail
                            </a>
                            <a
                                class="button is-danger is-light"
                                @click="deleteProducts(product.id)"
                            >
                                Delete
                            </a>
                        </th>
                    </tr>
                </tbody>
            </table>
        </section>
        <div class="modal" :class="{ 'is-active': isShowAddProductForm }">
            <div class="modal-background" @click="destroyAddProductForm"></div>
            <div class="modal-content">
                <div class="box">
                    <h1 class="title has-text-centered">Add Product</h1>
                    <form @submit.prevent="addProductForm">
                        <div class="field">
                            <label class="label" for="name">Name</label>
                            <div class="control">
                                <input
                                    v-model="name"
                                    id="name"
                                    class="input"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <img width="200px" :src="image_url" alt="" />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" for="image_url"
                                >Image Url</label
                            >
                            <div class="control">
                                <input
                                    v-model="image_url"
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
                                    v-model="price"
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
                                    v-model="stock"
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
                                    @click="destroyAddProductForm"
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
                @click="destroyAddProductForm"
            ></button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CategoryList from '@/components/CategoryList.vue';
import Swal from 'sweetalert2';

export default {
    name: 'Products',

    components: { CategoryList },

    data() {
        return {
            search: '',
            isShowAddProductForm: false,
            name: '',
            image_url: '',
            price: '',
            stock: '',
            selectedCategory: {},
        };
    },

    methods: {
        ...mapActions(['fetchProducts', 'addProduct', 'deleteProduct']),

        showAddProductForm() {
            this.isShowAddProductForm = true;
        },

        destroyAddProductForm() {
            this.isShowAddProductForm = false;
            this.name = '';
            this.image_url = '';
            this.price = '';
            this.stock = '';
            this.selectedCategory = {};
        },

        addProductForm() {
            const productData = {
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock,
                CategoryId: this.selectedCategory.id,
            };
            this.addProduct(productData)
                .then(() => {
                    this.destroyAddProductForm();
                    this.fetchProducts();
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

        goToDetail(id, slug) {
            this.$router.push({
                name: 'ProductsDetail',
                params: { id, slug },
            });
        },

        deleteProducts(id) {
            this.deleteProduct(id)
                .then(() => {
                    this.fetchProducts();
                })
                .catch(err => {
                    const { message } = err.response.data.errors[0];
                    Swal.fire({
                        title: 'Not Authenticated or Authorized',
                        text: message,
                    });
                });
        },
    },

    computed: {
        ...mapState(['products']),

        filteredProducts() {
            return this.products.filter(post => {
                return post.name
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        },
    },

    created() {
        this.fetchProducts();
    },
};
</script>

<style>
.product-image {
    max-width: 200px;
}
</style>
