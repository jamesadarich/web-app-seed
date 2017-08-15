import * as FileSystem from "fs";
import * as Handlebars from "handlebars";
import * as Watch from "watch";
import { get } from "http";

const cacheMappingPath = "./dist/";

export async function buildWebAppHtml(stats: any) {

    process.stdout.write("building web app index...\n");

    // build cache busted file name maps
    const cacheMap = getCacheMapping(stats.toJson());

    // get the content for the critical css
    Handlebars.registerPartial("loading.css", await getLoadingCss(cacheMap.styles.loading));

    // get the template index page
    const file = FileSystem.readFileSync("./app/index.html", "utf-8");
    const template = Handlebars.compile(file);

    // apply the cache busted file names and contents to the index page
    FileSystem.writeFileSync("./dist/index.html", template(cacheMap));

    process.stdout.write("web app index built\n");
}

async function getLoadingCss(loadingCssPath: string) {
    return new Promise((resolve, reject) => {
        FileSystem.exists("./dist/" + loadingCssPath, existsAsFile => {
            if (existsAsFile) {
                FileSystem.readFile("./dist/" + loadingCssPath, "utf-8", (err, data) => {
                    resolve(data);
                });
            }
            else {
                get("http://localhost:8080/" + loadingCssPath, response => {
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

function getCacheMapping(mappingConfig: any) {
    const mapping: CacheBustMap = {
        styles: {},
        scripts: {}
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

interface CacheBustMap {
    scripts: { [key: string]: string };
    styles: { [key: string]: string };
}
