<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { Message } from "@arco-design/web-vue";

const props = defineProps<{
  item: {
    textJp: string;
    textCn: string;
    comment?: string;
  };
}>();

const { copy } = useClipboard({ legacy: true });

function copyText(text: string) {
  try {
    copy(text);
    Message.success("复制成功：" + text);
  } catch (e) {
    Message.error("复制失败：" + e || "未知错误");
  }
}
</script>

<template>
  <a-card class="mb-3" :title="props.item.textCn"> </a-card>
</template>

<style scoped lang="scss"></style>
