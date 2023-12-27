<script setup lang="ts">
import WordCard from "./WordCard.vue";
import { ref, onMounted, onUnmounted } from "vue";

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
}),
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
</script>

<template>
  <a-input placeholder="输入中文或日语" />
  <div class="dict-body mt-5">
    <a-list
      fill
      :bordered="false"
      :virtualListProps="{
        fixedSize: true,
        height: virtualListHeight,
        estimatedSize: 83,
      }"
      :data="Array(100).fill({
            textJp: '日语',
            textCn: '中文',
            comment: '注释',
          })"
    >
      <template #item="{ item, index }">
        <word-card
          :item="item"
        />
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
