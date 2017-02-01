const startupNotification = document.createElement("h1");
startupNotification.innerHTML = "startup very successful";

setTimeout(() => {
    document.querySelector(".loading").className += " complete";
    document.body.appendChild(startupNotification);
}, 2000);