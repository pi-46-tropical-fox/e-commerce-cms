<template>
  <div class="container">
    <div class="form-box">
      <div class="left"></div>
      <form @submit.prevent="addProduct">
      <div class="right">
        <h2>New Book</h2>
        <input type="text" class="field" v-model="input.name"
          name="" id="" placeholder="Book title" required
        />
        <input type="text" class="field" v-model="input.image_url" name=""
          id="" placeholder="Cover book image url" required
        />
        <input type="number" class="field" v-model="input.price" name=""
          id="" placeholder="Book price"
        />
        <input type="number" class="field" v-model="input.stock" name="" id=""
          placeholder="Book stock"
        />
        <button class="btn">Add</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddForm',
  data () {
    return {
      input: {
        name: '',
        image_url: '',
        price: '',
        stock: ''
      }
    }
  },
  methods: {
    addProduct () {
      const inputProduct = {
        name: this.input.name,
        image_url: this.input.image_url,
        price: this.input.price,
        stock: this.input.stock
      }
      this.$store.dispatch('addProduct', inputProduct)
    }
  }
}
</script>

<style scoped>

.container
{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;
}
.container:after
{
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* background: url() no-repeat center; */
  filter: blur(50px);
  z-index: -1;
}

.form-box
{
  max-width: 850px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 19px 5px rgba(0,0,0,0.19);
}

.left {
  background: url('../assets/sf-wp5.jpg')no-repeat center;
  background-size: cover;
  height: 100%;
}

.right {
  padding: 25px 40px;
}

h2 {
  position: relative;
  padding: 0 0 10px;
  margin-bottom: 10px;
}

h2:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 4px;
  width: 50px;
  border-radius: 2px;
  background-color: #2ecc71;
}

.field {
  width: 100%;
  border: 2px solid rgba(0,0,0,0);
  outline: none;
  background-color: rgba(230, 230, 230, 0.6);
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 22px;
  transition: .3s;
}

.field:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

textarea {
  min-height: 150px;
}

.btn {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #2ecc71;
  color: #fff;
  font-size: 1.1rem;
  border: #fff;
  outline: none;
  cursor: pointer;
  transition: .3s;
}

.btn:hover {
  background-color: #27ae60;
}

.field:focus {
  border: 2px solid rgba(30,85,250,0.47);
  background: #fff;
}

@media screen and (max-width: 880px) {
  .form-box {
    grid-template-columns: 1fr;
  }
  .left {
    height: 200px;
  }
}
</style>
