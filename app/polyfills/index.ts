declare module "promise-polyfill/src/polyfill";

if ("Promise" in window) {
    import("promise-polyfill/src/polyfill");
}
