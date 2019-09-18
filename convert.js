const AWS = require('aws-sdk');
const csv = require("csvtojson");

const convertRow = (row) => {
  const newRow = {};
  Object.keys(row).map(key => {
    const attr = key.replace(/ \((.*)\)/, '');
    if (row[key]) {
      if (key.match(/ \(S\)/)) {
        newRow[attr] = row[key];
      } else if (key.match(/ \(BOOL\)/)) {
        console.log('boooooooooool');
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

const convert = (list) => {
  return list.map(convertRow).filter(project => project)
};

const convertFile = async filePath => {
  const jsonFile = await csv().fromFile(filePath);
  return convert(jsonFile);
};

module.exports = {
  convert,
  convertRow,
  convertFile
}