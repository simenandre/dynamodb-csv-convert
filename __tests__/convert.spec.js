const fs = require('fs');
const convert = require('../convert');
describe('dynamodb-csv-convert', () => {
    it('should convert row', () => {
        const row = JSON.parse(
            fs.readFileSync(`${__dirname}/../__fixtures__/one-row.json`, 'utf-8')
        );
        const res = convert.convertRow(row);
        expect(res).toHaveProperty('id');
        expect(res).toHaveProperty('binary');
        expect(res).toHaveProperty('binaryset');
        expect(res).toHaveProperty('boolean');
        expect(res).toHaveProperty('list');
        expect(res).toHaveProperty('map');
        expect(res).toHaveProperty('null');
        expect(res).toHaveProperty('number');
        expect(res).toHaveProperty('numberset');
        expect(res).toHaveProperty('stringset');
    });
    it('should convert multiple rows', () => {
        const rows = JSON.parse(
          fs.readFileSync(`${__dirname}/../__fixtures__/multiple-rows.json`, "utf-8")
        );
        const res = convert.convert(rows);
        expect(res[0]).toHaveProperty("id");
        expect(res[0]).toHaveProperty("binary");
        expect(res[0]).toHaveProperty("binaryset");
        expect(res[0]).toHaveProperty("boolean");
        expect(res[0]).toHaveProperty("list");
        expect(res[0]).toHaveProperty("map");
        expect(res[0]).toHaveProperty("null");
        expect(res[0]).toHaveProperty("number");
        expect(res[0]).toHaveProperty("numberset");
        expect(res[0]).toHaveProperty("stringset");
    });
    it('should convert a file', async () => {
        const res = await convert.convertFile(`${__dirname}/../__fixtures__/test-data.csv`);
        expect(res[0]).toHaveProperty("id");
        expect(res[0]).toHaveProperty("binary");
        expect(res[0]).toHaveProperty("binaryset");
        expect(res[0]).toHaveProperty("boolean");
        expect(res[0]).toHaveProperty("list");
        expect(res[0]).toHaveProperty("map");
        expect(res[0]).toHaveProperty("null");
        expect(res[0]).toHaveProperty("number");
        expect(res[0]).toHaveProperty("numberset");
        expect(res[0]).toHaveProperty("stringset");
    });
})
