// load polyfills
import "./polyfills";

import * as React from "react";
import { render } from "react-dom";
import { AppComponent } from "./components/app-component";

// start the app
render(<AppComponent />, document.getElementById("app"));
