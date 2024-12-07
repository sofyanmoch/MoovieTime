<template>
  <div class="relative font-sans">
    <Header />
    <div>
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/base/Header.vue";
</script>
