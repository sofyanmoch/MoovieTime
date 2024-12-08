<template>
  <div class="bg-white pb-16">
    <div class="container max-h-96 overflow-y-auto px-4 pb-4">
      <span class="mb-6 inline-block text-sm font-medium uppercase text-red-600">
        Reviews
      </span>
      <div
        class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8"
      >
        <template v-if="reviews.length > 0">
          <CardReview
            v-for="review in reviews"
            :key="review.id"
            :item="review"
          />
        </template>
        <template v-else>
          <div class="text-black">Review not found.</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import type { Review } from "~/types";
import CardReview from "./CardReview.vue";

defineProps<{
  reviews: Review[];
}>();
</script>
