
import * as React from "react";
import { render } from "react-dom";
import { AppComponent } from "./core/app";
import { loadPolyfills, FetchPolyfill } from "load-polyfills";

// load polyfills
loadPolyfills(FetchPolyfill).then(() => {
    // start the app
    render(<AppComponent />, document.getElementById("app"));
});
