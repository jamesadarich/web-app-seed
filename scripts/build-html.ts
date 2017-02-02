import * as FileSystem from "fs";
import * as Handlebars from "handlebars";
import * as Watch from "watch";

function buildWebAppHtml() {

    process.stdout.write("buliding web app index...\n");

    const encoding = "utf-8";
    const loadingCss = FileSystem.readFileSync("./public/dist/styles/loading.css", encoding);
    Handlebars.registerPartial("loading.css", loadingCss);

    const file = FileSystem.readFileSync("./public/src/index.html", encoding);

    const template = Handlebars.compile(file);

    FileSystem.writeFileSync("./public/dist/index.html", template({}));

    process.stdout.write("web app index built\n");
}

buildWebAppHtml();

if (process.argv.indexOf("--watch") !== -1) {

    Watch.watchTree("./public/dist",
    {
        filter: (path: string) => {
            return !/\.html$/.test(path);
        }
    },
    buildWebAppHtml);
}