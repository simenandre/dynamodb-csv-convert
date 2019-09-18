const csv = require('csvtojson');

(async () => {
  // find first argument (the file)
  const [bin, sourcePath, filePath] = process.argv;
  if (!filePath) {
    return console.log('Missing file attribute. Usage: npx dynamodb-db-convert file.csv');
  }
  if (!filePath.match(/.csv/)) {
    return console.log('Looks like you are trying to convert something else than csv?')
  }
  const jsonFile = await csv().fromFile(filePath);
  console.log(JSON.stringify(jsonFile.map(line => {
    const newLine = {};
    Object.keys(line).map(key => {
      const attr = key.replace(/ \(S\)/, '').replace(/ \(BOOL\)/, '').replace(/ \(N\)/, '');
      if (line[key] && key.match(/ \(S\)/)) {
        newLine[attr] = line[key];
      }
      if (line[key] && key.match(/ \(BOOL\)/)) {
        newLine[attr] = line[key] == "true" ? true : false;
      }
      if (line[key] && key.match(/ \(N\)/)) {
        newLine[attr] = parseInt(line[key]);
      }
    });
    return newLine;
  }).filter(project => project), null, 2));
})();