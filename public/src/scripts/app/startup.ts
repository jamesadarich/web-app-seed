// load the stylesheet
require("!style-loader!css-loader!sass-loader!../../styles/stylesheets/app.scss");

// start the app (dummy example)
const startupNotification = document.createElement("h1");
startupNotification.innerHTML = "startup successful";
document.body.appendChild(startupNotification);

// let the loading notification no we've completed loading the app
document.querySelector(".app-loading-notification").className += " complete";