<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { Message } from "@arco-design/web-vue";
import { Dictionary } from "@/types/Dictionary";

const props = defineProps<{
  item: Dictionary;
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
  <a-card class="mb-3" :title="props.item.TextCn">
    <a-space direction="vertical">
      <a-typography-text bold>{{ props.item.TextJp }}</a-typography-text>
      <a-typography-paragraph blockquote v-if="props.item.comment">
        {{ props.item.comment }}
      </a-typography-paragraph>
      <a-space size="mini" v-if="Array.isArray(props.item?.tags)">
        <a-tag v-for="tag in props.item.tags">{{ tag }}</a-tag>
      </a-space>
    </a-space>

    <template #actions>
      <a-space>
        <a-button
          type="primary"
          @click="copyText(props.item.TextCn)"
          icon="copy"
        >
          复制中文
        </a-button>
      </a-space>
    </template>
  </a-card>
</template>

<style scoped lang="scss">
</style>
