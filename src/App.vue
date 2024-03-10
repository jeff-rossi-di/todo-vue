<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <div id="wrapper">
    <HeaderBar />
    <main id="main">
      <RouterView />
    </main>
    <FooterBar />
  </div>
</template>


