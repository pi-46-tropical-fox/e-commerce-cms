<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-menu">
                <div class="navbar-start">
                    <router-link
                        :to="{ name: 'Dashboard' }"
                        active-class="is-active"
                        class="navbar-item is-tab"
                        >Dashboard
                    </router-link>
                    <router-link
                        :to="{ name: 'Products' }"
                        active-class="is-active"
                        class="navbar-item is-tab"
                        >Products
                    </router-link>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <a class="button is-danger is-light" @click="logout">
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',

    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
};
</script>

<style></style>
