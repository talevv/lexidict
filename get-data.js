const https = require('https');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const URL = 'https://en-word.net/static/english-wordnet-2024.xml.gz';
const OUTPUT_DIR = path.join(process.cwd(), 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'english-wordnet-2024.xml');

const getData = async () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  if (fs.existsSync(OUTPUT_FILE)) {
    console.log(`File already exists at ${OUTPUT_FILE}`);
    return;
  }

  return new Promise((resolve, reject) => {
    https.get(URL, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${URL}' (${response.statusCode})`));
        return;
      }

      const gunzip = zlib.createGunzip();
      const fileStream = fs.createWriteStream(OUTPUT_FILE);

      response.pipe(gunzip).pipe(fileStream);

      fileStream.on('finish', () => {
        console.log(`File successfully downloaded and unzipped to ${OUTPUT_FILE}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

module.exports = {
  getData
};