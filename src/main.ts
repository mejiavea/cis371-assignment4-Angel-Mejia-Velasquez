import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "./styles/mug.scss";
import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(pinia).mount("#app");
