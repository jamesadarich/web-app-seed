import { exists, readFile, writeFile } from "fs";
import * as Handlebars from "handlebars";
import * as Watch from "watch";
import { get } from "http";

const cacheMappingPath = "./dist/";

export async function buildWebAppHtml(stats: any) {

    process.stdout.write("building web app index...\n");

    // build cache busted file name maps
    const settings = getSettingsMapping(stats.toJson());

    // get the content for the critical css
    Handlebars.registerPartial("loading.css", await getLoadingCss(settings.styles.loading));

    try {
        // apply the cache busted file names and contents to the index page
        await updateFileReferences(settings, "./app/index.html", "./dist/index.html");
    }
    catch (error) {
        console.log("failed to build index:", error.message);
    }
    
    try {
        const registerServiceWorkerPath = "dist/" + settings.scripts["register-service-worker"];
        // apply the cache busted file names to register service worker
        await updateFileReferences(settings, registerServiceWorkerPath, registerServiceWorkerPath);
    }
    catch (error) {
        console.log("failed to register service worker:", error.message);
    }
    
    try {
        // apply the cache busted file names and contents to the index page
        await updateFileReferences(settings, "./app/manifest.json", "./dist/manifest.json");
    }
    catch (error) {
        console.log("failed to build manifest:", error.message);
    }
    
    await copyFile("./dist/scripts/" + settings.scripts["service-worker"], "./dist/" + settings.scripts["service-worker"]);

    process.stdout.write("web app index built\n");
}

async function updateFileReferences(settings: SettingsMap, sourcePath: string, destinationPath: string) {
    const file = await readFileAsync(sourcePath);
    const template = Handlebars.compile(file);
    await writeFile(destinationPath, template(settings));
}

async function copyFile(sourcePath: string, destinationPath: string) {
    const file = await readFileAsync(sourcePath);
    await writeFile(destinationPath, file);
}

async function readFileAsync(sourcePath: string) {
    return new Promise((resolve, reject) => {
        readFile(sourcePath, "utf-8", (error, file) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(file);
            }
        });
    });
}

async function writeFileAsync(destinationPath: string, contents: string) {
    return new Promise((resolve, reject) => {
        writeFile(destinationPath, contents, error => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}

async function getLoadingCss(loadingCssPath: string) {
    return new Promise<any>((resolve, reject) => {
        exists("./dist/" + loadingCssPath, existsAsFile => {
            if (existsAsFile) {
                readFile("./dist/" + loadingCssPath, "utf-8", (err, data) => {
                    resolve(data);
                });
            }
            else {
                get("http://localhost:3000/" + loadingCssPath, response => {
                    let data = "";
                    response.on("data", chunk => data += chunk);
                    response.on("end", () => {
                        resolve(data);
                    });
                });
            }
        });
    });
}

function getSettingsMapping(mappingConfig: any) {
    const mapping: SettingsMap = {
        styles: {},
        scripts: {},
        colors: {
            theme: "#00bcd4"
        }
    };

    // map the old file names to their new ones
    mappingConfig.chunks.forEach((chunk: any) => {
        const stylesheetName = getByExtension(chunk.files, "css");

        if (stylesheetName) {
            mapping.styles[chunk.names[0]] = stylesheetName;
        }
        else {            
            mapping.scripts[chunk.names[0]] = getByExtension(chunk.files, "js");
        }
    });

    // ensure service worker is at root level
    const serviceWorkerPaths = mapping.scripts["service-worker"].split("/");
    mapping.scripts["service-worker"] = serviceWorkerPaths[serviceWorkerPaths.length - 1];

    return mapping;
}

function getByExtension(files: Array<string>, extension: string) {
    const regex = new RegExp(extension + "$");
    const hotUpdateRegex = new RegExp("\.hot-update\." + extension + "$");

    const matchingFiles = files.filter(file => regex.test(file) && !hotUpdateRegex.test(file));

    if (matchingFiles.length === 0) {
        return null;
    }
    else if (matchingFiles.length > 1) {
        console.log(matchingFiles);
        throw new Error(matchingFiles.length + " files matching ." + extension);
    }
    
    return matchingFiles[0];
}

interface SettingsMap {
    scripts: StringMap;
    styles: StringMap;
    colors: StringMap;
}

interface StringMap {
    [key: string]: string;
}
