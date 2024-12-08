<template>
  <div
    :key="item.id"
    class="bg-hero aspect-[1/1] lg:aspect-[25/9] md:aspect-[3/2]"
    :style="{
      backgroundImage: `url(${$img(
        `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      )})`,
    }"
  >
    <Transition appear name="fade-slow">
      <div v-show="mounted" class="h-full">
        <div class="absolute bottom-0 w-full bg-black p-2 sm:p-5">
          <div class="container lg:pl-72 md:pl-72">
            <div
              class="flex flex-wrap items-center gap-y-2 lg:flex-nowrap lg:gap-0"
            >
              <div class="flex items-center gap-2 sm:gap-4">
                <span class="h-10 w-10 m-auto text-[#FFB802] lg:h-10 lg:w-10 pt-2">
                  <Stars />
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-semibold lg:text-4xl">
                    {{ Math.floor(item.vote_average * 10) / 10 || 0 }}
                  </span>
                  <div
                    class="flex flex-col gap-1 text-xs font-medium uppercase"
                  >
                    <span class="text-white/50">User Score</span>
                    <span class="text-white"
                      >{{ item.vote_count || 0 }} Votes</span
                    >
                  </div>
                </div>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8"></div>
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Status</span>
                <span class="text-white">{{ item.status || "-" }}</span>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8"></div>
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Language</span>
                <span class="text-white">{{
                  item.original_language || "-"
                }}</span>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8"></div>
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Budget</span>
                <span class="text-white">{{
                  usdFormat.format(item.budget || 0)
                }}</span>
              </div>
              <div class="mx-4 h-10 border-r lg:mx-8"></div>
              <div class="flex flex-col gap-1 text-xs font-medium uppercase">
                <span class="text-white/50">Production</span>
                <span class="text-white">{{
                  item.production_companies?.[0]?.name || "-"
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="container absolute bottom-32 left-1/2 w-full transform px-4 md:-bottom-36 -translate-x-1/2 lg:-bottom-1/5"
        >
          <div class="flex gap-8">
            <div class="hidden aspect-[10/16] w-56 lg:block">
              <NuxtImg
                v-if="item.poster_path"
                width="400"
                height="600"
                format="webp"
                :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
                :alt="item.title || item.name || ''"
                class="shadow-lg object-cover"
                :style="{ 'view-transition-name': `item-${item.id}` }"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-black/50"
              >
                <i class="text-4xl text-gray-500">?</i>
              </div>
            </div>
            <div class="mt-4">
              <span class="text-lg font-medium">
                {{
                  item.release_date?.slice(0, 4) ||
                  item.first_air_date?.slice(0, 4)
                }}
              </span>
              <h1 class="my-1 text-2xl font-semibold lg:text-4xl">
                {{ item.title || item.name }}
              </h1>
              <span class="text-sm font-medium">
                {{ item?.genres?.map((i) => i.name).join(", ") }}
              </span>
            </div>
          </div>
        </div>
        <div
          class="container overview absolute left-1/2 -translate-x-1/2 px-4 md:-bottom-24 bottom-1/4 sm:-bottom-1/6 xs:bottom-1/5 md:pl-74 lg:pl-72"
        >
          <div class="flex flex-col">
            <span
              class="mb-1.5 inline-block text-sm font-medium uppercase text-red-600"
            >
              Overview
            </span>
            <p class="text-sm leading-relaxed text-black">
              {{ item.overview }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.bg-hero::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}
@media (max-width: 768px) {
  .overview {
    bottom: -20%;
  }
}
</style>

<script setup lang="ts">
import { usdFormat } from "~/composables/utils";
import Stars from "./icons/Stars.vue";
import type { Media } from "~/types";

defineProps<{
  item: Media;
}>();

const $img = useImage();
const mounted = useMounted();
</script>
