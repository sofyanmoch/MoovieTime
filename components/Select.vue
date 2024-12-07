<template>
    <div ref="select" class="relative">
      <button
        :style="`max-width: ${maxWidth}px`"
        :class="{ 'w-full': block }"
        class="min-w-[200px] flex items-center justify-between gap-4 rounded bg-gray-600 px-4 py-2"
        @click="open = !open"
      >
        <span class="flex-1 truncate text-left text-sm">{{ valueString || placeholder }}</span>
        <span
          :class="open ? 'i-ph:caret-up-fill' : 'i-ph:caret-down-fill'"
          class="block h-4 w-4 text-gray-400"
        />
      </button>
      <div
        v-if="open"
        :style="`top: ${height}`"
        :class="{ 'w-full': block }"
        class="absolute flex flex-col cursor-pointer gap-2 rounded bg-gray-900 py-1 text-sm text-white"
      >
        <template v-for="(opt, index) in options" :key="index">
          <div class="px-3.5 py-1.5 hover:bg-white hover:text-black" @click="setSelected(opt)">
            {{ opt.name || '-' }}
          </div>
        </template>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Options {
    name: string
    value: string | number | boolean
  }
  
  // Ubah modelValue menjadi tipe yang lebih spesifik
  interface ModelValueObject {
    name: string
  }
  
  const props = defineProps<{
    modelValue: string | ModelValueObject // Tipe modelValue bisa berupa string atau objek dengan properti 'name'
    placeholder: string
    options: Options[]
    maxWidth?: number | string
    block?: boolean
  }>()
  
  const emit = defineEmits(['update:model-value'])
  
  const open = ref(false)
  const select = ref<HTMLDivElement>()
  const { height } = useElementSize(select)
  
  function setSelected(val: any) {
    emit('update:model-value', val)
    open.value = false
  }
  
  const valueString = computed(() => {
    if (!props.modelValue) return ''
    // Periksa apakah modelValue adalah objek dengan properti 'name'
    if (typeof props.modelValue === 'object' && 'name' in props.modelValue) {
      return (props.modelValue as ModelValueObject).name
    }
  
    return props.modelValue
  })
  
  onClickOutside(select, () => open.value = false)
  </script>
  