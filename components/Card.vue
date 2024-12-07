<template>
  <div class="flex flex-col gap-1 sm:gap-3">
    <div class="relative aspect-[10/16]">
      <!-- Overlay dengan opacity dan transition -->
      <div class="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-80 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div class="h-full flex flex-col items-center justify-evenly">
          <!-- Star Icon dan Rating -->
          <div class="flex items-center gap-3">
            <svg class="h-7 w-7 text-[#FFB802]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.949 1.477 8.285-7.413-3.905-7.413 3.905 1.477-8.285-6.064-5.949 8.332-1.151z" />
            </svg>
            <span class="text-2xl font-semibold">{{ Math.floor(item.vote_average * 10) / 10 || 0 }}</span>
          </div>
          <!-- Genre -->
          <div class="text-lg font-semibold">
            {{ genre }}
          </div>
          <!-- Button -->
          <NuxtLink
            :to="`/${item.media_type || type}/${item.id}`"
            class="rounded-full px-8 py-2 bg-[#FF0000] text-white font-semibold hover:bg-[#ee0000]"
          >
            View
          </NuxtLink>
        </div>
      </div>
      <!-- Badge Rating -->
      <div class="absolute right-0 top-0 z-1 bg-[#1E232B] bg-opacity-80 px-2.5 py-1.5">
        <span class="text-lg text-neutral-200 font-semibold">{{ Math.floor(item.vote_average * 10) / 10 || 0 }}</span>
      </div>
      <!-- Gambar Poster -->
      <NuxtImg
        v-if="item.poster_path"
        width="400"
        height="600"
        format="webp"
        :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
        :alt="item.title || item.name || ''"
        class="h-full w-full object-cover"
        :style="{ 'view-transition-name': `item-${item.id}` }"
      />
      <!-- Placeholder Jika Tidak Ada Poster -->
      <div v-else class="h-full flex items-center justify-center bg-white bg-opacity-10">
        <svg class="text-gray-400 text-4xl" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
    <!-- Informasi Judul dan Tanggal -->
    <div class="flex flex-col gap-1">
      <span class="truncate text-sm font-semibold sm:text-base">{{ item.title || item.name }}</span>
      <span class="text-xs text-[#929292] sm:text-sm">{{ item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4) }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import type { Media, MediaType } from '~/types'

defineProps<{
  type: MediaType
  item: Media
  genre: string
}>()
</script>