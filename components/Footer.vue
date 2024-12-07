<template>
  <div class="bg-black/30">
    <div
      class="relative mb-16 flex flex-col items-center justify-between gap-4 px-4 py-16 text-gray-400 md:mb-0 lg:flex-row container mx-auto"
    >
      <span
        >© {{ new Date().getFullYear() }} MoovieTime. All rights reserved.</span
      >
      <LogoFooter
        class="w-full transform lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:top-1/2"
      />
      <span>
        Made with
        <a href="https://nuxt.com/" class="hover:underline" target="_blank">
          Nuxt
        </a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoFooter from "./icons/LogoFooter.vue";
</script>
