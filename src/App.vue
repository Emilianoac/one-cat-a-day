<script setup>

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container">
      <RouterLink class="navbar-brand mx-auto" to="/">
        <img class="img-fluid" src="/logo.png"/>
      </RouterLink>
    </div>
  </nav>
  <RouterView />
</template>

<style lang="scss">

  .navbar {

    .navbar-brand img {
      max-width: 150px;
    }
  }
</style>
