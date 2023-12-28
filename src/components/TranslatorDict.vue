<script setup lang="ts">
import WordCard from "./WordCard.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Dictionary } from "@/types/Dictionary";
import { getPossibleCandidate } from "@/utils/filterUtils";

const props = defineProps<{
  dictionary: Dictionary[];
}>();

const searchString = ref("");

const searchType: Array<{
  label: "搜索文本" | "搜索标签";
  value: "text" | "tags";
}> = [
  {
    label: "搜索文本",
    value: "text",
  },
  {
    label: "搜索标签",
    value: "tags",
  },
];

const currentSearchType = ref(searchType[0].value);

const filteredDictionary = computed(() =>
  getPossibleCandidate(
    searchString.value,
    props.dictionary,
    currentSearchType.value
  ).sort((a, b) => {
    if (a.TextCn && b.TextCn) {
      return a.TextCn.localeCompare(b.TextCn);
    }
    return 0;
  })
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
  <a-input-group class="w-full">
    <a-input allow-clear v-model="searchString" placeholder="输入中文或日语" />
    <a-select
      v-model="currentSearchType"
      :options="searchType"
      :style="{ width: '7rem' }"
    />
  </a-input-group>
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
