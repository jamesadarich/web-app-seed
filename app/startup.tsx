
import * as React from "react";
import { render } from "react-dom";
import { AppComponent } from "./core/app";
import { loadPolyfills } from "load-polyfills";

// load polyfills
loadPolyfills().then(() => {
    // start the app
    render(<AppComponent />, document.getElementById("app"));
});
