import * as FileSystem from "fs";
import * as Handlebars from "handlebars";
import * as Watch from "watch";

const cacheMappingPath = "./public/dist/cache-bust-mapping/";

function buildWebAppHtml() {

    process.stdout.write("buliding web app index...\n");

    // build cache busted file name maps
    const cacheMap: any = {};

    cacheMap.stylesheets = getCacheMapping("stylesheets");
    cacheMap.scripts = getCacheMapping("scripts");

    // get the content for the critical css
    const encoding = "utf-8";
    const loadingCss = FileSystem.readFileSync("./public/dist/styles/" + cacheMap.stylesheets.loading, encoding);
    Handlebars.registerPartial("loading.css", loadingCss);

    // get the template index page
    const file = FileSystem.readFileSync("./public/src/index.html", encoding);
    const template = Handlebars.compile(file);

    // apply the cache busted file names and contents to the index page
    FileSystem.writeFileSync("./public/dist/index.html", template(cacheMap));

    process.stdout.write("web app index built\n");
}

function getCacheMapping(mappingName: string) {
    
    // get the mapping output from the cache buster
    const mappingConfig = JSON.parse(FileSystem.readFileSync(cacheMappingPath + mappingName + ".json", "utf-8"));

    const mapping: { [key: string]: string} = {};

    // map the old file names to their new ones
    Object.keys(mappingConfig.assetsByChunkName)
    .forEach(key => {
        const remappedName = mappingConfig.assetsByChunkName[key];

        // if the remapped name is a string then just asign it
        if (typeof remappedName === "string") {
            mapping[key] = remappedName; 
        }
        // otherwise it's an array so 
        else {            
            mapping[key] = remappedName[0]; 
        }
    });

    return mapping;
}

buildWebAppHtml();

// if we were told to watch
if (process.argv.indexOf("--watch") !== -1) {

    // check out the cache busting maps and rebuild when they change
    Watch.watchTree(cacheMappingPath,
    {
        filter: (path: string) => {
            return !/\.html$/.test(path);
        }
    },
    buildWebAppHtml);
}