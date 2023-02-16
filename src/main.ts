import { createApp } from "vue";
import router from "./router";

import { Quasar } from "quasar";
import quasarLang from "quasar/lang/de";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import App from "./App.vue";

const app = createApp(App);
app.use(router);

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
});

app.mount("#app");
