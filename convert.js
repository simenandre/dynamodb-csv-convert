import { default as AWS } from 'aws-sdk';
import { default as csv } from 'csvtojson';

export const convertRow = row => {
  const newRow = {};
  Object.keys(row).map(key => {
    const attr = key.replace(/ \((.*)\)/, '');

    if (key.match(/\(NULL\)/)) {
      newRow[attr] = null;
      return;
    }

    const types = {
      '(S)': val => val,
      '(BOOL)': val => (val == 'true' ? true : false),
      '(N)': val => parseInt(val),
      '(M)': val => AWS.DynamoDB.Converter.unmarshall(JSON.parse(val)),
      '(B)': val => val,
      '(BS)': val => val,
      '(L)': val => AWS.DynamoDB.Converter.unmarshall(JSON.parse(val)),
      '(NS)': val => val,
      '(SS)': val => val,
    };

    newRow[attr] =
      Object.keys(types)
        .map(t => {
          return key.match(new RegExp(t)) ? types[t](row[key]) : false;
        })
        .find(t => t) || row[key];
  });

  return newRow;
};

export const convert = list => {
  return list.map(convertRow).filter(project => project);
};

export const convertFile = async filePath => {
  const jsonFile = await csv().fromFile(filePath);
  return convert(jsonFile);
};
