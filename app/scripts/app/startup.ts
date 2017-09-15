import { initializeApp } from "./initialize-react";

// load the stylesheet
require("!style-loader!css-loader!sass-loader!../../styles/stylesheets/app.scss");

// start the app (dummy example)
initializeApp().then(() => {
    
    // let the loading notification no we've completed loading the app
    document.querySelector(".app-loading-notification").className += " complete";
});

