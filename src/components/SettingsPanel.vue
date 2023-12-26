<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Settings } from "@/types/Settings";
import { useSettingsStore } from "@/store/settings";
import { toggleTheme, setAlwaysOnTop } from "@/utils/viewsUtils";

const useStore = useSettingsStore();

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

watch(
  () => settings.value.alwaysOnTop,
  async value => {
    await setAlwaysOnTop(value);
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
    <div class="flex flex-col gap-3">
      <div class="flex justify-between gap-3">
        <a-tooltip>
          <template #content>
            <div>使用深色背景。</div>
          </template>
          <span>深色模式</span>
        </a-tooltip>
        <a-checkbox v-model="settings.darkMode" />
      </div>

      <div class="flex justify-between gap-3">
        <a-tooltip>
          <template #content>
          <div>窗口会总是浮在所有应用前方，不会被遮挡。</div>
        </template>
          <span>总是置于屏幕顶端</span>
        </a-tooltip>
        <a-checkbox v-model="settings.alwaysOnTop" />
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="scss"></style>
