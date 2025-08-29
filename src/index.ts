import "@riotjs/hot-reload";
import { component } from "riot";
import App from "./app.riot";
import registerGlobalComponents from "./register-global-components";

// register
registerGlobalComponents();

// mount the root tag

const el = document.getElementById("root");
el && component(App)(el);