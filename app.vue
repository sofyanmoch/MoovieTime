<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'MoovieTime',
  titleTemplate: title => title !== 'MoovieTime' ? `${title} · MoovieTime` : title,
  meta: [
    { name: 'description', content: 'Millions of movies, TV shows and people to discover. Explore now.' },
  ]
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
