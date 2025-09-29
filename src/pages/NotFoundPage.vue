<template>
    <!-- design a good looking 404 page -->
    <div class="not-found">
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/" class="btn btn-primary">Go to Home</router-link>
    </div>
</template>
    
<script>
export default {
    name: 'NotFoundPage'
}
</script>

<style scoped>
    .not-found {
        text-align: center;
        margin-top: 100px;
    }
    .btn {
        margin-top: 20px;
    }
</style>
