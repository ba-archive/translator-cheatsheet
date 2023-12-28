<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Settings } from "@/types/Settings";
import { useSettingsStore } from "@/store/settings";
import { toggleTheme, setAlwaysOnTop } from "@/utils/viewsUtils";
import { Message } from "@arco-design/web-vue";
import { useDictionaryStore } from "@/store/dictionary";
import axios from "axios";

const useStore = useSettingsStore();
const useDictionary = useDictionaryStore();

const settings = computed({
  get: () => useStore.settings,
  set: (value: Settings) => {
    useStore.setSettings(value);
  },
});

const visible = ref(false);

watch(
  () => settings.value.darkMode,
  value => {
    toggleTheme(value);
  }
);

const fetching = ref(false);

async function updateDictionary() {
  fetching.value = true;
  axios
    .get(`https://translator.blue-archive.io/dictionary.json?t=${Date.now()}`)
    .then(res => {
      if (res.status === 200) {
        useDictionary.setDictionary(res.data);
        Message.success("词典更新成功");
      } else {
        throw new Error("获取词典更新失败");
      }
    })
    .catch(err => {
      Message.error(err.message);
    }).finally(() => {
      fetching.value = false;
    });
}

watch(
  () => settings.value.alwaysOnTop,
  async value => {
    const code = await setAlwaysOnTop(value);
    if (code !== 0) {
      Message.error("当前环境无法设置");
      settings.value.alwaysOnTop = false;
    }
  }
);
</script>

<template>
  <a-button
    type="text"
    class="!fixed top-3 right-3 w-min z-[999]"
    @click="visible = !visible"
  >
    <icon-settings size="24" />
  </a-button>

  <a-modal v-model:visible="visible" title="设置" width="auto">
    <a-space direction="vertical" :style="{minWidth: '200px'}">
      <div class="flex justify-between gap-3 items-center">
        <a-tooltip position="tl">
          <template #content>
            <div>使用深色背景。</div>
            <div>在 Windows 上更改背景时，应用需要重启。</div>
          </template>
          <span>深色模式</span>
        </a-tooltip>
        <a-checkbox v-model="settings.darkMode" />
      </div>

      <div class="flex justify-between gap-3 items-center">
        <a-tooltip position="tl">
          <template #content>
            <div>窗口会总是浮在所有应用前方，不会被遮挡。</div>
          </template>
          <span>总是置于屏幕顶端</span>
        </a-tooltip>
        <a-checkbox v-model="settings.alwaysOnTop" />
      </div>

      <div class="flex justify-between gap-3 items-center">
        <a-tooltip position="tl">
          <template #content>
            <div>从服务器获取最新的词典条目。</div>
          </template>
          <span>更新词典条目</span>
        </a-tooltip>
        <a-button type="primary" :loading="fetching" @click="updateDictionary">
          更新
        </a-button>
      </div>
    </a-space>
  </a-modal>
</template>

<style scoped lang="scss">
</style>
