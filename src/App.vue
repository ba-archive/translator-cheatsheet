<script setup lang="ts">
import SettingsPanel from './components/SettingsPanel.vue';
import TranslatorDict from './components/TranslatorDict.vue';
import { useSettingsStore } from './store/settings';
import { toggleTheme, setAlwaysOnTop } from './utils/viewsUtils';
import { onMounted, computed } from 'vue';
import { useDictionaryStore } from './store/dictionary';
import { Dictionary } from './types/Dictionary';

const useStore = useSettingsStore();
const useDictionary = useDictionaryStore();

const settings = useStore.getSettings;
const dict = computed(() => useDictionary.getDictionary);

onMounted(() => {
  toggleTheme(settings.darkMode);
  setAlwaysOnTop(settings.alwaysOnTop);
});
</script>

<template>
  <settings-panel />
  <translator-dict :dictionary="(dict as unknown as Dictionary[])"/>
</template>

<style scoped>

</style>
