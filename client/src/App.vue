<template>
    <div id="app">
        <transition name="slide" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
