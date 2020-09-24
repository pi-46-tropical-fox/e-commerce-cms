<template>
    <section class="section">
        <div class="container is-fluid">
            <div class="columns is-desktop">
                <div class="column">
                    <figure class="image">
                        <img src="../assets/undraw_add_to_cart_vkjp.svg" />
                    </figure>
                </div>
                <div class="column form-side">
                    <div class="form-auth">
                        <h1 class="title">E-Commerce CMS</h1>
                        <form @submit.prevent="loginForm">
                            <div class="container form-container">
                                <div class="field">
                                    <label for="email-signup" class="label"
                                        >Email</label
                                    >
                                    <div
                                        class="control has-icons-left has-icons-right"
                                    >
                                        <input
                                            class="input"
                                            name="email"
                                            v-model="loginData.email"
                                            type="email"
                                            id="email-signup"
                                            required
                                        />
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="field">
                                    <label for="password-signup" class="label"
                                        >Password</label
                                    >
                                    <div
                                        class="control has-icons-left has-icons-right"
                                    >
                                        <input
                                            class="input"
                                            name="password"
                                            v-model="loginData.password"
                                            type="password"
                                            id="password-signup"
                                            required
                                        />
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-lock"></i>
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    class="button btn-sign is-medium is-fullwidth"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'Login',

    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
        };
    },

    methods: {
        ...mapActions(['login']),
        ...mapMutations(['setCurrentUser']),
        loginForm() {
            this.login(this.loginData)
                .then(result => {
                    this.setCurrentUser(result);
                    localStorage.setItem(
                        'access_token',
                        result.data.access_token
                    );
                    this.$router.push({ name: 'Dashboard' });
                    this.email = '';
                    this.password = '';
                })
                .catch(err => {
                    const { message } = err.response.data.errors[0];
                    Swal.fire({
                        title: 'Invalid Login',
                        text: message,
                    });
                });
        },
    },
};
</script>

<style>
.form-auth {
    border-radius: 20px;
    padding: 50px;
    box-shadow: 0px 0px 23px 4px rgba(168, 168, 168, 0.78);
    margin: auto;
}

.form-side {
    display: flex;
}
</style>
