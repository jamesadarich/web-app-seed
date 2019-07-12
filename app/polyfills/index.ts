import "promise-polyfill/src/polyfill";

export async function loadPolyfills() {
    const polyfills = [];

    if ("fetch" in window === false) {
        // polyfills.push(import("whatwg-fetch"));
        polyfills.push(async() => {});
    }

    return Promise.all(polyfills);
};
