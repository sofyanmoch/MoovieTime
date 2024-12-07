<template>
  <div class="my-10 sm:mt-0">
    <!-- Hero Section -->
    <div class="hidden h-80 bg-gray-900 sm:block"></div>
    <div class="container mx-auto px-4 sm:-mt-60">
      <!-- Header Section -->
      <div class="mb-6 flex items-end justify-between gap-4 md:mb-10">
        <h1 class="text-2xl font-semibold md:text-4xl">
          <span class="mb-3 block h-1.5 w-20 bg-gray-300 md:w-32"></span>
          <span class="capitalize">{{ title }}</span>
        </h1>
        <!-- Mobile Filter Controls -->
        <div class="flex items-center md:hidden">
          <button
            class="flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition"
            :class="{ 'border-blue-500 text-blue-500': filtered }"
            @click="openFilter"
          >
            <span class="material-icons">tune</span> Filter
          </button>
          <button
            v-if="filtered"
            class="px-4 py-1.5 text-sm text-blue-400 hover:underline"
            @click="resetFilter"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex gap-8">
        <!-- Sidebar for Filters -->
        <aside class="hidden w-60 rounded-lg bg-gray-800 p-5 md:block">
          <div>
            <h2 class="text-base font-semibold text-gray-200">
              Sort Result By
            </h2>
            <Select
              class="mt-4"
              v-model="sortBy"
              placeholder="Choose Sort By"
              :options="sortByOptions"
            />
          </div>
          <hr class="my-5 border-gray-600" />
          <div>
            <h2 class="text-base font-semibold text-gray-200">Genres</h2>
            <div class="mt-4 flex flex-col gap-3">
              <template v-for="(g, index) in genreList" :key="index">
                <Checkbox
                  :id="g.name + g.id"
                  v-model="genres"
                  :value="g"
                  :label="g.name"
                />
              </template>
            </div>
          </div>
        </aside>

        <!-- Media List -->
        <section class="flex-1">
          <div
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <ClientOnly>
              <Card
                v-for="list in lists"
                :key="list.id"
                :item="list"
                :genre="getGenre(list.genre_ids[0])"
                :type="type"
              />
            </ClientOnly>
          </div>
          <!-- Load More Button -->
          <button
            class="mx-auto mt-10 flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
            @click="handleLoadMore"
          >
            <span v-if="!loadingLoad">Load More</span>
            <span v-else class="flex items-center gap-2">
              <span class="material-icons animate-spin">autorenew</span>
              Loading...
            </span>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Genre, Media, MediaType, Options } from "~/types";
import Select from "~/components/Select.vue";

definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return ["movie", "tv"].includes(params.type as MediaType);
  },
});

const route = useRoute();
const type = computed(() => (route.params.type as MediaType) || "movies");

useHead({
  title: type.value === "movie" ? "Movies" : "TV Shows",
});

const title = getTitle(type.value);
const filterBottomSheet = ref();
const loadingLoad = ref(false);
const page = ref(1);

const sortBy = ref({
  name: "Popularity Descending",
  value: "popularity.desc",
});
const genres = ref<Genre[]>([]);

const lists = ref<Media[]>([]);
const sortByOptions: Options[] = [
  {
    name: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    name: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    name: "Release Date Ascending",
    value: "primary_release_date.asc",
  },
  {
    name: "Release Date Descending",
    value: "primary_release_date.desc",
  },
  {
    name: "Rating Ascending",
    value: "vote_average.asc",
  },
  {
    name: "Rating Descending",
    value: "vote_average.desc",
  },
] as Options[];
const genreList = await findListGenre(type.value);
function getGenre(genre_ids: number) {
  return genreList.find((item) => item.id === genre_ids)?.name || "";
}

async function fetchDiscoverList(loadMore = false) {
  const payload = {
    page: page.value,
    sort_by: sortBy.value.value,
    with_genres: genres.value.map((obj) => obj.id).join(","),
  };
  const data = await findDiscoverByType(type.value, payload);
  if (loadMore) lists.value.push(...data.results);
  else lists.value = data.results;
}

function openFilter() {
  filterBottomSheet.value.open();
}

function resetFilter() {
  sortBy.value = {
    name: "Popularity Descending",
    value: "popularity.desc",
  };
  genres.value = [];
  page.value = 1;
  fetchDiscoverList();
}

const filtered = computed(
  () => sortBy.value.value !== "popularity.desc" || genres.value.length > 0
);

async function handleLoadMore() {
  if (loadingLoad.value) return;
  loadingLoad.value = true;
  try {
    page.value++;
    await fetchDiscoverList(true);
  } finally {
    loadingLoad.value = false;
  }
}

watch(
  () => sortBy.value,
  () => {
    page.value = 1;
    fetchDiscoverList();
  }
);

watch(
  () => genres.value,
  () => {
    page.value = 1;
    fetchDiscoverList();
  }
);

onMounted(() => {
  fetchDiscoverList();
});
</script>