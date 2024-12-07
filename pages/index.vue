<template>
  <div>
    <div class="py-10">
      <Slider :items="slides.results" />
    </div>
    <DiscoverMovies
      v-for="list in lists"
      :key="list.type"
      :title="list.title"
      :type="list.type as MediaType"
      class="mb-10 sm:mb-20"
    />
  </div>
</template>

<script setup lang="ts">
import { findListTrending } from "~/composables/tmdb";
import type { MediaType } from "~/types";

const lists = [
  {
    title: "Movies",
    type: "movie",
  },
];

const slides = await findListTrending("movie", "week");
</script>
