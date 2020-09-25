<template>
  <div>
    <div class="wrapper text-center">
      <span class="block mb-4">Or sign in using your Google account</span>
      <div id="g-signin" class="flex justify-center"></div>
    </div>
  </div>
</template>

<script>
export default {
    mounted() {
        this.renderButton()
    },

    methods: {
        renderButton(){
            gapi.signin2.render('g-signin', {
                'scope': 'profile email',
                'width': 160,
                'height': 40,
                'longtitle': false,
                'theme': 'dark',
                'onsuccess': this.gSignInOnSuccess,
                'onfailure': this.gSignInOnFailure
            });
        },

        gSignInOnSuccess(data){
            this.$emit('googleLogin', data)
        },

        gSignInOnFailure(data){
            this.$emit('gSignInOnFail', data)
        }
    }
};
</script>

<style>
</style>