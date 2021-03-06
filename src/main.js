import DefaultLayout from "~/layouts/Default.vue";

import "~/main.css";
import "~/helpers/fontawesome";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
