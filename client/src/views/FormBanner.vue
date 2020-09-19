<template>
<!-- Add Banner page START -->
    <div class="addPage">
        <div class="addForm">
            <i class="fa fa-phone-square" aria-hidden="true"></i>
            <h4>Banner</h4>
            <hr>
            <!-- add form -->
            <form v-if="setStatus" @submit.prevent="addBanner">
                <div class="form-group">
                    <label for="name">Banner's Name</label>
                    <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    id="image_url" placeholder="http://image.jpg">
                </div>
                <div class="form-group">
                    <label for="category">Banner's Status</label><br>
                    <select v-model="status" name="status" id="status">
                      <option value="select" selected disabled>--select status--</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Description</label><br>
                    <textarea
                    v-model="description"
                    name="description"
                    id="" cols="35" rows="5">
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
                <router-link :to="{name: 'BannerTable'}">
                  <button type="button" class="ml-2 btn btn-secondary">Cancel</button>
                </router-link>
            </form>
            <!-- edit form -->
            <form v-else @submit.prevent="editBanner">
                <div class="form-group">
                    <label for="name">Banner's Name</label>
                    <input
                    v-model="name"
                    type="text"
                    class="form-control" id="name">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <input
                    v-model="image_url"
                    type="text"
                    class="form-control"
                    id="image_url">
                </div>
                <div class="form-group">
                    <label for="category">Banner's Status</label><br>
                    <select v-model="status" name="status" id="status">
                      <option value="select" selected disabled>--select status--</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Description</label><br>
                    <textarea
                    v-model="description"
                    name="description"
                    cols="35" rows="5">
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary">Edit</button>
                <router-link :to="{name: 'BannerTable'}">
                  <button type="button" class="ml-2 btn btn-secondary">Cancel</button>
                </router-link>
            </form>
        </div>
    </div>
<!-- Add Banner END -->
</template>

<script>
export default {
  name: 'FormBanner',
  data () {
    return {
      addForm: true,
      addName: '',
      addImage: '',
      addDescription: '',
      addStatus: 'select'
    }
  },
  computed: {
    setStatus () {
      return this.$store.state.statusAdd
    },
    name: {
      get () {
        this.addName = this.$store.state.banner.name
        return this.$store.state.banner.name
      },
      set (newName) {
        this.addName = newName
      }
    },
    image_url: {
      get () {
        this.addImage = this.$store.state.banner.image_url
        return this.$store.state.banner.image_url
      },
      set (newImage) {
        this.addImage = newImage
      }
    },
    description: {
      get () {
        this.addDescription = this.$store.state.banner.description
        return this.$store.state.banner.description
      },
      set (newDescription) {
        this.addDescription = newDescription
      }
    },
    status: {
      get () {
        this.addStatus = this.$store.state.banner.status || 'select'
        return this.$store.state.banner.status || 'select'
      },
      set (newStatus) {
        this.addStatus = newStatus
      }
    }
  },
  methods: {
    addBanner () {
      const newBanner = {
        name: this.addName,
        image_url: this.addImage,
        status: this.addStatus,
        description: this.addDescription
      }
      this.$store.dispatch('addBanner', newBanner)
    },
    editBanner () {
      const updatedBanner = {
        name: this.addName,
        image_url: this.addImage,
        status: this.addStatus,
        description: this.addDescription,
        id: this.$store.state.banner.id
      }
      console.log(this.$store.state.banner.id, 'ini id nya')
      this.$store.dispatch('editBanner', updatedBanner)
    }
  }
}
</script>
