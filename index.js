#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { getData } = require('./get-data');
const { convertWordnet } = require('./convert');

(async () => {
  const argv = yargs(hideBin(process.argv))
    .option("format", {
      alias: "f",
      description: "Output format (json or csv)",
      choices: ["json", "csv"],
      default: "json",
    })
    .help()
    .alias("help", "h")
    .argv;

  if (argv.help) {
    return;
  }

  try {
    await getData();
    convertWordnet(argv.format);
  } catch (error) {
    console.error(error);
  }
})();