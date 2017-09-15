import * as React from "react";
import { render } from "react-dom";
import { AppComponent } from "./components/app-component";

export async function initializeApp() {
    return new Promise((resolve, reject) => {
        render(<AppComponent />, document.getElementById("app"), resolve);
    });
}
