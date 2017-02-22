// IE 9 loading animation fallback

// when the DOM is done loading
document.addEventListener("DOMContentLoaded", (event) => {

    // get the element that lets the user know we're loading the app
    const appLoadingNotifcationElement = document.querySelector(".app-loading-notification");

    // get the elements that indicate loading is going on
    const loadingElements = appLoadingNotifcationElement.querySelectorAll(".loading-indicator > div");

    // hide them all
    for (let i = 0; i < loadingElements.length; i++) {
        (loadingElements[i] as HTMLElement).style.visibility = "hidden";
    }

    let current = 0;

    // loop through showing and hiding items
    const interval = setInterval(() => {

        // if the app has notified us that it has completed loading then stop the loop
        if (appLoadingNotifcationElement.className.indexOf("complete") !== -1) {
            clearInterval(interval);
            return;
        }

        // hide the current visible element
        (loadingElements[current] as HTMLElement).style.visibility = "hidden";

        // move on to the next element
        current++;

        // or first if we've gone past the last element
        if (current >= loadingElements.length) {
            current = 0;
        }

        // show the next element
        (loadingElements[current] as HTMLElement).style.visibility = "visible";
    }, 250);
});
