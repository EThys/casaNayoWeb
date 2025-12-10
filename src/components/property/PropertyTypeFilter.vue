<script setup lang="ts">
import { computed } from 'vue'
import type { PropertyGroup, PropertyType } from '@/types/property'
import {
  PROPERTY_GROUP_LABELS,
  PROPERTY_TYPE_LABELS,
  PROPERTY_TYPE_TO_GROUP,
} from '@/types/property'

interface Props {
  selectedGroup?: PropertyGroup
  selectedType?: PropertyType
  onGroupChange?: (group: PropertyGroup | undefined) => void
  onTypeChange?: (type: PropertyType | undefined) => void
}

const props = withDefaults(defineProps<Props>(), {
  selectedGroup: undefined,
  selectedType: undefined,
})

const emit = defineEmits<{
  'group-change': [group: PropertyGroup | undefined]
  'type-change': [type: PropertyType | undefined]
}>()

const groups: PropertyGroup[] = ['residential', 'commercial', 'event', 'hospitality', 'land']

const groupIcons: Record<PropertyGroup, string> = {
  residential: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  commercial: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  event: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  hospitality: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  land: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
}

const availableTypes = computed(() => {
  if (!props.selectedGroup) return []
  return Object.entries(PROPERTY_TYPE_TO_GROUP)
    .filter(([_, group]) => group === props.selectedGroup)
    .map(([type]) => type as PropertyType)
})

const handleGroupClick = (group: PropertyGroup) => {
  const newGroup = props.selectedGroup === group ? undefined : group
  emit('group-change', newGroup)
  if (props.onGroupChange) props.onGroupChange(newGroup)
}

const handleTypeClick = (type: PropertyType) => {
  const newType = props.selectedType === type ? undefined : type
  emit('type-change', newType)
  if (props.onTypeChange) props.onTypeChange(newType)
}
</script>

<template>
  <div class="property-type-filter">
    <!-- Group Filters -->
    <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide mb-4">
      <button
        v-for="group in groups"
        :key="group"
        @click="handleGroupClick(group)"
        class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap flex-shrink-0"
        :class="
          selectedGroup === group
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="groupIcons[group]"
          />
        </svg>
        <span class="text-sm font-medium">{{ PROPERTY_GROUP_LABELS[group] }}</span>
      </button>
    </div>

    <!-- Type Filters (shown when a group is selected) -->
    <div
      v-if="selectedGroup && availableTypes.length > 0"
      class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide"
    >
      <button
        v-for="type in availableTypes"
        :key="type"
        @click="handleTypeClick(type)"
        class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap flex-shrink-0 text-sm"
        :class="
          selectedType === type
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
        "
      >
        <span class="font-medium">{{ PROPERTY_TYPE_LABELS[type] }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

