<template>
  <div class="rounded-lg bg-gray-100 p-6 shadow-md">
    <div class="mb-8 flex items-center justify-between gap-2">
      <div class="flex items-center gap-4">
        <div class="h-12 w-12 rounded-full">
          <NuxtImg
            v-if="item.author_details.avatar_path"
            width="100"
            height="100"
            format="webp"
            :src="`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`"
            :alt="item.author || item.author_details.name"
            class="shadow-lg h-full w-full rounded-full object-cover"
          />
          <div
            v-else
            class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200"
          >
            <div class="text-xl text-gray-400">?</div>
          </div>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800">
            {{ item.author || item.author_details.name }}
          </p>
          <span class="text-xs text-gray-500">{{ item.created_at }}</span>
        </div>
      </div>
      <div
        class="flex items-center gap-1.5 rounded-lg bg-gray-200 py-1 pl-2 pr-3 text-black"
      >
        <svg
          class="h-4 w-4 text-yellow-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 .587l3.668 7.431L24 9.168l-6 5.847 1.417 8.255L12 18.897l-7.417 4.373L6 15.015 0 9.168l8.332-1.15z"
          />
        </svg>
        <span class="text-lg font-semibold">
          {{ Number(item.author_details.rating).toFixed(1) || 0 }}
        </span>
      </div>
    </div>
    <div
      class="text-sm leading-relaxed italic text-gray-800"
      :class="{ 'line-clamp-8': lineClampEnabled }"
      v-html="item.content"
    />
  </div>
</template>

<style scoped>
.line-clamp-8 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 8;
}
</style>

<script setup lang="ts">
import type { Review } from '~/types'

defineProps<{
  item: Review
}>()

const lineClampEnabled = true;
</script>
