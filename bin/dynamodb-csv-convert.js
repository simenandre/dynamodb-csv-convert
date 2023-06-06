import * as convert from '../convert.js';

(async () => {
  const [, , filePath] = process.argv;

  if (!filePath) {
    return console.log(
      "Missing file attribute. Usage: npx dynamodb-db-convert file.csv"
    );
  }
  if (!filePath.match(/.csv/)) {
    return console.log(
      "Looks like you are trying to convert something else than csv?"
    );
  }

  console.log(
      JSON.stringify(await convert.convertFile(filePath), null, 2)
  );
})();