import { writeFile } from "fs";
import { createInterface } from "readline";

async function initializeSolution() {
    const appName = await requestUserInput("Choose your app name");
    const somethingElse = await requestUserInput("Something else");
    const anotherThing = await requestUserInput("Another thing");
    process.stdout.write(`\nappName: ${appName}\nsometihngElse: ${somethingElse}\nanotherThing: ${anotherThing}`);
    process.exit(0);
}

const commandLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function requestUserInput(prompt: string) {
    return new Promise<string>(resolve => {
        commandLine.question(prompt + ": ", resolve);
    });
}

initializeSolution();
