# 🚀 LexiDict 📚

**LexiDict** is a command-line tool that converts **Open English WordNet** data into **JSON** or **CSV**, creating a structured dictionary of words and meanings.

## Features
- Converts **Open English WordNet** data to **JSON** or **CSV**.
- Provides a **dictionary-like structure** with word meanings and relationships.
- Simple command-line interface for easy usage.

## How It Works

LexiDict automatically downloads the latest Open English WordNet XML data from https://en-word.net/ when you run the command. There's no need to manually download or manage the source files - just run the command and LexiDict handles the download, parsing, and conversion process for you. The tool caches downloaded data locally to improve performance on subsequent runs.

## Installation

Install LexiDict globally using **npm**:
```sh
npm install -g lexidict
```

## Usage

Run LexiDict with the desired format:

### Convert WordNet to JSON
```sh
lexidict --format json
```
This will generate a **JSON file** containing dictionary data.

### Convert WordNet to CSV
```sh
lexidict --format csv
```
This will generate a **CSV file** with structured dictionary entries.

### Show Help Menu
```sh
lexidict --help
```
OR
```sh
lexidict -h
```
Displays all available commands and options.

## Example Output

### JSON Format Example
```json
{
  "word": "example",
  "partOfSpeech": "n",
  "definitions": [
    "a representative form or pattern",
    "something to be imitated"
  ]
}
```

### CSV Format Example
```csv
"word","partOfSpeech","meanings"
example,"n","a representative form or pattern"
example,"n","something to be imitated"
```

## Data Source
LexiDict is based on **Open English WordNet**, which is licensed under the [Princeton WordNet License](https://wordnet.princeton.edu/license-and-commercial-use). This tool **does not modify** the word definitions but restructures them for easier use.

## License
This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Author
Tadeusz Lewandowski

---

🚀 **LexiDict** makes it easy to convert **WordNet data** into structured dictionary formats. Try it out today!

