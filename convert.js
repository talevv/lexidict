const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");
const { parse } = require("json2csv");

const INPUT_DIR = path.join(process.cwd(), "data");
const OUTPUT_DIR = path.join(process.cwd(), "output");
const INPUT_FILE = path.join(INPUT_DIR, "english-wordnet-2024.xml");

const convertWordnet = (format) => {
  // Load and parse XML
  const xmlData = fs.readFileSync(INPUT_FILE, "utf-8");
  const parser = new XMLParser({ ignoreAttributes: false });
  const wordnet = parser.parse(xmlData);

  // Extract LexicalEntries and Synsets
  const lexicalEntries = wordnet.LexicalResource.Lexicon.LexicalEntry;
  const synsets = wordnet.LexicalResource.Lexicon.Synset;

  // Create a dictionary mapping synset IDs to definitions
  const synsetMap = {};
  synsets.forEach((synset) => {
    const synsetID = synset["@_id"];
    const definition = synset.Definition;
    synsetMap[synsetID] = definition;
  });

  // Map words to their meanings
  const wordnetJSON = {};
  lexicalEntries.forEach((entry) => {
    const word = entry.Lemma["@_writtenForm"];
    const partOfSpeech = entry.Lemma["@_partOfSpeech"];
    const senses = Array.isArray(entry.Sense) ? entry.Sense : [entry.Sense]; // Handle single vs multiple senses

    // Create id for the word to fix a problem with restrictions on object keys in JSON
    const wordId = `w-${word.replace(/\s+/g, "_")}`;
    // Ensure wordnetJSON[word] is initialized
    if (!wordnetJSON[wordId]) {
      wordnetJSON[wordId] = { meanings: [] };
    }

    // Add meanings as objects with definition and partOfSpeech
    senses.forEach((sense) => {
      const definition = synsetMap[sense["@_synset"]] || "Definition not found.";
      wordnetJSON[wordId].meanings.push({ definition, partOfSpeech });
    });
  });

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  // Save as JSON or CSV based on the specified format
  if (format === "json") {
    const OUTPUT_FILE = path.join(OUTPUT_DIR, "lexidict.json");
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(wordnetJSON, null, 2));
    console.log(`Data converted to JSON successfully! Saved to ${OUTPUT_FILE}`);
  } else if (format === "csv") {
    const OUTPUT_FILE = path.join(OUTPUT_DIR, "lexidict.csv");
    const csvData = Object.entries(wordnetJSON).map(([word, data]) => ({
      word,
      meanings: data.meanings
        .map((meaning) => `${meaning.partOfSpeech}: ${meaning.definition}`)
        .join("; "),
    }));
    const csv = parse(csvData);
    fs.writeFileSync(OUTPUT_FILE, csv);
    console.log(`Data converted to CSV successfully! Saved to ${OUTPUT_FILE}`);
  }
}

module.exports = {
  convertWordnet
};