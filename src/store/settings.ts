import { defineStore } from "pinia";
import { Settings } from "@/types/Settings";

export const useSettingsStore = defineStore({
  id: "cheatsheet-settings",
  persist: true,
  state: () => {
    return {
      settings: {
        darkMode: true,
        alwaysOnTop: false,
      } as Settings,
    };
  },
  getters: {
    getSettings: state => state.settings,
  },
  actions: {
    setTheme(param: Settings["darkMode"]) {
      this.settings.darkMode = param;
    },
    setAlwaysOnTop(alwaysOnTop: Settings["alwaysOnTop"]) {
      this.settings.alwaysOnTop = alwaysOnTop;
    },
    setSettings(settings: Settings) {
      this.settings = settings;
    }
  },
});
