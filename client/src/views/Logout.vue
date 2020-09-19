<template>
    <div>
        <h1>Logging you out</h1>
    </div>
</template>


<script>
export default {
    created(){
        this.$store.dispatch('logout')
    }
}
</script>

