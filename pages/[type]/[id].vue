<template>
    <div>
      <Hero :item="item" />
      <Review :reviews="reviews.results" class="pt-40" />
      
      <div class="container px-4 py-12">
        <h1 class="mb-10 text-white font-semibold uppercase text-2xl">
          Recommendation Movies
        </h1>
        
        <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <Card
            v-for="list in recommendations.results"
            :key="list.id"
            :item="list"
            :genre="getGenre(list.genre_ids[0])"
            :type="type"
            class="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Card from "~/components/Card.vue";
  import Review from "~/components/Review.vue";
  import type { MediaType } from "~/types";
  
  definePageMeta({
    key: (route) => route.fullPath,
    validate: ({ params }) => {
      return ["movie", "tv"].includes(params.type as MediaType);
    },
  });
  
  const route = useRoute();
  const type = computed(() => (route.params.type as MediaType) || "movies");
  const id = computed(() => route.params.id as string);
  
  const [item, recommendations, reviews] = await Promise.all([
    findMediaById(type.value, id.value),
    findListRecommendation(type.value, id.value),
    findReviewsById(type.value, id.value),
  ]);
  
  const genreList = await findListGenre(type.value);
  function getGenre(genre_ids: number) {
    return genreList.find((item) => item.id === genre_ids)?.name || "";
  }
  
  const $img = useImage();
  
  useHead({
    title: item.name || item.title,
    meta: [
      { name: "description", content: item.overview },
      { property: "og:title", content: item.name || item.title },
      { property: "og:description", content: item.overview },
      {
        property: "og:image",
        content: $img(`https://image.tmdb.org/t/p/original${item.poster_path}`, { width: 1200, height: 630 }),
      },
      { property: "twitter:title", content: item.name || item.title },
      { property: "twitter:description", content: item.overview },
      {
        property: "twitter:image",
        content: $img(`https://image.tmdb.org/t/p/original${item.poster_path}`, { width: 1200, height: 630 }),
      },
    ],
  });
  </script>
  