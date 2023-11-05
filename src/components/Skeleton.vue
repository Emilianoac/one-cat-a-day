<script setup>
  const props = defineProps({
    width: {
      default: "100%",
      type: String,
    },
    height: {
      default: "200px",
      type: String
    },
    bRadius: {
      default: "6px",
      type: String
    }
  })
</script>

<template>
  <div 
    class="skeleton" 
    :style="`width: ${width}; height: ${height}; border-radius: ${bRadius}`">
  </div>
</template>


<style lang="scss">

  .skeleton {
    width: 100%;
    height: 200px;
    background: linear-gradient(40deg, white 40px, rgb(216, 216, 216) 80px 50px, white);
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 600% 600%;
    border-radius: 6px;
    animation: loader-bg 2s ease-in-out infinite;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    opacity: 0.8;
  }

    
  @keyframes loader-bg {
    0% {
      background-position: 0% 82%;
    }

    50% {
      background-position: 100% 19%;
    }

    100% {
      background-position: 0% 82%;
    }
  }
</style>