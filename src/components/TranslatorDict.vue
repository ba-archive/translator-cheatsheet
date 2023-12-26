<script setup lang="ts"></script>

<template>
  <a-input placeholder="输入中文或日语" />
  <div class="dict-body mt-3">
    <div class="flex flex-col gap-3">
      <a-card v-for="item in 100"></a-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dict-body {
  height: calc(100vh - 8rem);
  overflow-y: auto;
}
</style>
