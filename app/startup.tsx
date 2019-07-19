
import { FetchPolyfill, loadPolyfills } from "load-polyfills";
import * as React from "react";
import { render } from "react-dom";
import { AppComponent } from "./core/app";

// load polyfills
loadPolyfills(FetchPolyfill).then(() => {
    // start the app
    render(<AppComponent />, document.getElementById("app"));
});
