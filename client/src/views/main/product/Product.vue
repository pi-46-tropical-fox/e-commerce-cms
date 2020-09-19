<template>
  <div class="container">
    <div>
      <button class="btn btn-secondary" v-b-modal.modal-1>
        Add Product +
      </button>
    </div>
    <ProductTable
      v-for="product in products.data"
      :key="product.id"
      :product="product"
      @delete="deleteProducts"
      @edit="fetchDetail"
    ></ProductTable>
    <!-- Modal -->
    <AddForm @productManipulate="addProduct"></AddForm>
    <EditForm
      :detailProduct="detailProduct"
      @editProduct="editProduct"
    ></EditForm>
  </div>
</template>

<script>
import ProductTable from "../../../components/table/ProductTable";
import AddForm from "../../../components/modal/product/ProductAddForm";
import EditForm from "../../../components/modal/product/ProductEditForm";

export default {
  name: "Product",
  computed: {
    products: {
      get() {
        return this.$store.state.productData;
      },
    },
    detailProduct: {
      get() {
        return this.$store.state.detailProduct;
      },
    },
  },
  components: {
    ProductTable,
    AddForm,
    EditForm,
  },
  methods: {
    getProducts() {
      this.$store.dispatch("getProduct");
    },
    deleteProducts(value) {
      this.$store
        .dispatch("deleteProduct", value)
        .then(() => {
          this.getProducts();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: 'Deleted Successfully',
          });
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.errors,
          });
        });
    },
    addProduct(value) {
      this.$store
        .dispatch("addProduct", value.payload)
        .then(res => {
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message,
          });
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.errors,
          });
        });
    },
    fetchDetail(value) {
      this.$store.dispatch("getDetailProduct", value);
    },
    editProduct(modal) {
      this.$store
        .dispatch("updateProduct", this.detailProduct)
        .then(res => {
          this.getProducts();
          this.$swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message,
          });
          modal.hide();
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.errors,
          });
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.container {
  margin: 1em;
  display: flex;
  flex-direction: column;
}
</style>
