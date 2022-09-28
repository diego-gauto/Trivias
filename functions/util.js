const Papa = require("papaparse");
const path = require('path');
const os = require('os');
const fs = require('fs');

/**
 * Convert a string to camel case
 * Ex: Hola a todos => holaATodos
 * 
 * @param {string} str: value to convert to camel case 
 * @returns {string}
 */
 exports.toCamelCase = (str) => { 
  return str.toLowerCase().replace(/\s+(.)/g, (match, group1) => {
      return group1.toUpperCase().replace("-", "");
  }).replace(/\s+$/, '');
}

/**
 * Read csv file from Cloud Storage and parses it to JSON.
 * @param {object} admin: Firebase admin object, needed to read from Cloud Storage
 * @param {string} sourceBucket: Cloud Storage Bucket where file is saved (ex: "gs://marketing-gonvar.appspot.com")
 * @param {string} sourceFileName: Path in the Bucket where file is saved (ex: "pastUsersSourceFiles/pastUsers.csv")
 * @returns {object}
 */
exports.parseStorageBucketToJson = async (admin, sourceBucket, sourceFileName) => {
  const bucket = admin.storage().bucket(sourceBucket);
  const tempFilePath = path.join(os.tmpdir(), sourceFileName.split("/").at(-1));
  await bucket.file(sourceFileName).download({destination: tempFilePath});
  const file = fs.createReadStream(tempFilePath)
  const jsonData = await new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete(results) {
        resolve(results.data);
      },
      error(err) {
        reject(err);
      }
    })
  });
  fs.unlinkSync(tempFilePath);
  return jsonData;
}
