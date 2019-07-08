// load the stylesheet
import "!style-loader!css-loader!sass-loader!../../styles/stylesheets/app.scss";

// load polyfills
import "./polyfills";

import { initializeApp } from "./initialize-react";

// start the app (dummy example)
initializeApp().then(() => {

    // let the loading notification no we've completed loading the app
    document.querySelector(".app-loading-notification").className += " complete";
});
