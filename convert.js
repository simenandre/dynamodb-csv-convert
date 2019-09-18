const csv = require('csvtojson');
const AWS = require('aws-sdk');

module.exports = async () => {

  const [bin, sourcePath, filePath] = process.argv;

  if (!filePath) {
    return console.log('Missing file attribute. Usage: npx dynamodb-db-convert file.csv');
  }
  if (!filePath.match(/.csv/)) {
    return console.log('Looks like you are trying to convert something else than csv?')
  }

  const convertRow = (row) => {
    const newRow = {};
    Object.keys(row).map(key => {
      const attr = key.replace(/ \((.*)\)/, '');
      if (row[key]) {
        if (key.match(/ \(S\)/)) {
          newRow[attr] = row[key];
        } else if (key.match(/ \(BOOL\)/)) {
          newRow[attr] = row[key] == "true" ? true : false;
        } else if (key.match(/ \(N\)/)) {
          newRow[attr] = parseInt(row[key]);
        } else if (key.match(/ \(M\)/)) {
          newRow[attr] = AWS.DynamoDB.Converter.unmarshall(JSON.parse(row[key]));
        } else {
          newRow[attr] = row[key];
        }
      }
    });
    return newRow;
  }

  const jsonFile = await csv().fromFile(filePath);
  console.log(
    JSON.stringify(jsonFile.map(convertRow).filter(project => project), null, 2)
  );
};