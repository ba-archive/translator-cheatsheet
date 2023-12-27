import { defineStore } from 'pinia';
import { Dictionary } from '@/types/Dictionary';
import dictionary from 'public/dictionary.json';

export const useDictionaryStore = defineStore({
  id: 'cheatsheet-dictionary',
  persist: true,
  state: () => {
    return {
      dictionary: dictionary as unknown as Dictionary,
    };
  },
  getters: {
    getDictionary: (state) => state.dictionary,
  },
  actions: {
    setDictionary(dictionary: Dictionary) {
      this.dictionary = dictionary;
    },
  },
});