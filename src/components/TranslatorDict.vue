<script setup lang="ts">
import WordCard from "./WordCard.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Dictionary } from "@/types/Dictionary";
import { getPossibleCandidate } from "@/utils/filterUtils";

const props = defineProps<{
  dictionary: Dictionary[];
}>();

const searchString = ref("");

const filteredDictionary = computed(() =>
  getPossibleCandidate(searchString.value, props.dictionary)
);

function getVirtualListHeight() {
  const height = window.innerHeight;
  return height - 9 * 16;
}

const virtualListHeight = ref(getVirtualListHeight());

function handleResize() {
  virtualListHeight.value = getVirtualListHeight();
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <a-input allow-clear v-model="searchString" placeholder="输入中文或日语" />
  <div class="dict-body mt-5">
    <a-list
      fill
      :bordered="false"
      :virtualListProps="{
        fixedSize: true,
        height: virtualListHeight,
        estimatedSize: 83,
      }"
      :data="filteredDictionary"
    >
      <template #item="{ item }">
        <word-card :item="item" :key="item.TextCn" />
      </template>
    </a-list>
  </div>
</template>

<style scoped lang="scss">
// .dict-body {
//   height: calc(100vh - 8rem);
//   overflow-y: auto;
// }
</style>
