import { createApp } from "vue";
import "./styles.scss";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Message } from "@arco-design/web-vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
Message._context = app._context;
app.use(pinia).mount("#app");
