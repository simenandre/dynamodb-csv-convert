import { default as fs } from 'fs';
import { describe, it, expect } from 'vitest';
import * as convert from '../convert';

describe('dynamodb-csv-convert', () => {
  it('should convert row', () => {
    const row = JSON.parse(
      fs.readFileSync(`${__dirname}/../__fixtures__/one-row.json`, 'utf-8'),
    );
    const res = convert.convertRow(row);
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('binary');
    expect(typeof res.binary).toBe('string');
    expect(res).toHaveProperty('binaryset');
    // TODO: Support binaryset
    expect(typeof res.binaryset).toBe('string');
    expect(res).toHaveProperty('boolean');
    expect(typeof res.boolean).toBe('boolean');
    expect(res).toHaveProperty('list');
    expect(typeof res.list).toBe('object');
    expect(res).toHaveProperty('map');
    expect(typeof res.map).toBe('object');
    expect(res).toHaveProperty('null');
    expect(res.null).toBe(null);
    expect(res).toHaveProperty('number');
    expect(typeof res.number).toBe('number');
    expect(res).toHaveProperty('numberset');
    expect(typeof res.numberset).toBe('string');
    expect(res).toHaveProperty('stringset');
  });
  it('should convert multiple rows', () => {
    const rows = JSON.parse(
      fs.readFileSync(
        `${__dirname}/../__fixtures__/multiple-rows.json`,
        'utf-8',
      ),
    );
    const res = convert.convert(rows);
    expect(res[0]).toHaveProperty('id');
    expect(res[0]).toHaveProperty('binary');
    expect(res[0]).toHaveProperty('binaryset');
    expect(res[0]).toHaveProperty('boolean');
    expect(res[0]).toHaveProperty('list');
    expect(res[0]).toHaveProperty('map');
    expect(res[0]).toHaveProperty('null');
    expect(res[0]).toHaveProperty('number');
    expect(res[0]).toHaveProperty('numberset');
    expect(res[0]).toHaveProperty('stringset');
  });
  it('should convert a file', async () => {
    const res = await convert.convertFile(
      `${__dirname}/../__fixtures__/test-data.csv`,
    );
    expect(res[0]).toHaveProperty('id');
    expect(res[0]).toHaveProperty('binary');
    expect(res[0]).toHaveProperty('binaryset');
    expect(res[0]).toHaveProperty('boolean');
    expect(res[0]).toHaveProperty('list');
    expect(res[0]).toHaveProperty('map');
    expect(res[0]).toHaveProperty('null');
    expect(res[0]).toHaveProperty('number');
    expect(res[0]).toHaveProperty('numberset');
    expect(res[0]).toHaveProperty('stringset');
  });
});
