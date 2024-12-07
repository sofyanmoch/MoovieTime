<template>
  <div class="relative z-50 bg-white/5">
    <div
      class="container h-16 max-h-16 flex items-center justify-between gap-4 p-4"
    >
      <NuxtLink v-if="!openSearch" to="/">
        <Logo class="text-white" />
      </NuxtLink>

      <!-- Search bar visible for large screens -->
      <div class="hidden flex-1 lg:flex">
        <Search
          v-model="search"
          block
          placeholder="Find movie"
          :data="searchData?.results || []"
          :loading="loading"
        >
          <template #icon-left>
            <IconMovie />
          </template>
          <template #icon-right>
            <IconSearch v-if="!search" />
            <span v-else class="i-carbon-close" @click="search = ''" />
          </template>
        </Search>
      </div>

      <!-- Menu items -->
      <div
        class="hidden items-center gap-10 text-sm font-semibold uppercase text-neutral-200 lg:flex"
      >
        <template v-for="(menu, index) in menu" :key="index">
          <div v-if="!menu.path" ref="elCategories" class="relative">
            <div
              class="flex cursor-pointer items-center gap-3"
              @click="openCategories = !openCategories"
            >
              <component
                :is="menu.icon"
                class="transition-rotate transform transition duration-300"
                :class="{ 'rotate-45': openCategories }"
              />
              <span>{{ menu.name }}</span>
            </div>
            <div
              v-show="openCategories"
              class="absolute mt-3 max-h-80 overflow-y-auto rounded-md bg-white py-1"
            >
              <div
                v-for="category in categories"
                :key="category.id"
                class="cursor-pointer px-4 py-1 text-sm text-[#1E232B] hover:bg-black-50 hover:text-white"
              >
                {{ category.name }}
              </div>
            </div>
          </div>
          <NuxtLink v-else :to="menu.path" class="flex items-center gap-3">
            <component :is="menu.icon" />
            <span>{{ menu.name }}</span>
          </NuxtLink>
        </template>
      </div>

      <!-- Search bar visible for small screens -->
      <div v-if="openSearch" class="block flex-1 lg:hidden">
        <Search
          v-model="search"
          block
          placeholder="Find movie"
          :data="searchData?.results"
          :loading="loading"
        >
          <template #icon-left>
            <IconMovie />
          </template>
          <template #icon-right>
            <IconSearch v-if="!search" />
            <span v-else class="i-carbon-close" @click="search = ''" />
          </template>
        </Search>
      </div>

      <!-- Search toggle button for small screens -->
      <div class="flex items-center gap-4 lg:hidden">
        <button v-if="!openSearch" @click="openSearch = !openSearch">
          <IconSearch class="h-6 w-6" />
        </button>
        <button v-else class="h-6 w-6">
          <span class="i-carbon-close block h-6 w-6" @click="closeSearch" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Component } from "vue";
import CategoriesIcon from "@/components/icons/Categories.vue";
import Logo from "@/components/icons/Logo.vue";
import IconSearch from "@/components/icons/Search.vue";
import IconMovie from "@/components/icons/Movie.vue";
import { findListGenre, findSearchKeyword } from "~/composables/tmdb";
import { useDebounceFn } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

interface IMenu {
  name: string;
  path: string;
  icon?: Component;
}

const loading = ref(false);
const search = ref("");
const searchData = ref<any>();
const error = ref();
const openSearch = ref(false);
const openCategories = ref(false);
const elCategories = ref();
const menu: IMenu[] = [
  { name: "Categories", path: "", icon: CategoriesIcon },
  { name: "Movies", path: "/movie" },
  { name: "Tv Shows", path: "/tv" },
  { name: "Login", path: "/login" },
];

const categories = await findListGenre("movie");
onClickOutside(elCategories, () => (openCategories.value = false));

function closeSearch() {
  search.value = "";
  openSearch.value = false;
}

async function searching() {
  if (!search) return;
  loading.value = true;
  try {
    searchData.value = await findSearchKeyword(search.value);
  } catch (err: any) {
    error.value = err;
  } finally {
    loading.value = false;
  }
}

const throttledSearch = useDebounceFn(searching, 500);
watch(search, () => throttledSearch());

const { width } = useWindowSize();
watch(width, () => {
  if (width.value > 768 && openSearch.value) openSearch.value = false;
});
</script>
