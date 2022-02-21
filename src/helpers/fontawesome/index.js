import Vue from "vue";

import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faCheckCircle,
  faCircleNotch,
  faExclamationCircle,
  faEnvelope,
  faLock
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheckCircle, faCircleNotch, faEnvelope, faExclamationCircle, faLock);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
