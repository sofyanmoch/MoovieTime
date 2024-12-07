<template>
  <div>
    <div class="h-80 bg-white bg-opacity-5" />
    <div class="container px-4 -mt-64 sm:-mt-56">
      <!-- Header Section -->
      <div class="mb-10 flex flex-col justify-between gap-x-2 gap-y-4 md:flex-row">
        <div class="text-2xl font-semibold">
          <span class="mb-3 block h-1.5 w-32 bg-[#E74C3C]" />
          <span>Discover {{ title }}</span>
        </div>
        <!-- Sorting Buttons -->
        <div class="flex items-center gap-3 sm:gap-5">
          <button
            class="rounded-full py-2 px-4 font-semibold text-sm text-white cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
            :class="sortBy === 'popularity' ? 'bg-[#E74C3C]' : 'bg-black-20'"
            @click="sortBy = 'popularity'"
          >
            Popularity
          </button>
          <button
            class="rounded-full py-2 px-4 font-semibold text-sm text-white cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
            :class="sortBy === 'primary_release_date' ? 'bg-[#E74C3C]' : 'bg-black-20'"
            @click="sortBy = 'primary_release_date'"
          >
            Release Date
          </button>
        </div>
      </div>
      <!-- Grid Cards -->
      <div class="grid grid-cols-2 gap-6 lg:grid-cols-5">
        <Card
          v-for="list in lists"
          :key="list.id"
          :item="list"
          :genre="getGenre(list.genre_ids[0])"
          :type="type"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import type { Media, MediaType } from '~/types'

const props = defineProps<{
  type: MediaType
  title: string
}>()

const sortBy = ref('popularity')
const lists = ref<Media[]>()

const genreList = await findListGenre(props.type)
function getGenre(genre_ids: number) {
  return genreList.find(item => item.id === genre_ids)?.name || ''
}
watch(sortBy, () => {
  fetchDiscoverList()
})
async function fetchDiscoverList() {
  const payload = {
    page: 1,
    sort_by: `${sortBy.value}.desc`,
  }
  const data = await findDiscoverByType(props.type, payload)
  console.log(data, 'data movie')
  lists.value = data.results
}

onMounted(() => fetchDiscoverList())
</script>