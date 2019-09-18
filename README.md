# dynamodb-csv-convert

CLI-utility to convert DynamoDB CSV exports done in AWS Console

[![npm version](https://badge.fury.io/js/dynamodb-csv-convert.svg)](https://badge.fury.io/js/dynamodb-csv-convert)


## Usage

This line will convert the file to json.

```bash
$ npx dynamodb-csv-convert file.csv > file.json
```

## Please don't use this tool to do backups…

And here is why. This tool is just for simple stuff – it's designed to be a small CLI utility to quickly convert those pesky (S), (SS), etc to a valid JSON document. However, this utility does not support the whole typeset that can be exported; thus, you'll have issues if you needed to convert this for any
real things.

This tool does not support; BS, NS, SS

## License

**[MIT](LICENSE)** Licensed

---

[Optional footer information here. Maybe thank a friend. Maybe plug your Twitter account. Whatever.]
