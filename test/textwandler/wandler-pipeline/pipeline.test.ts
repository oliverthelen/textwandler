import { describe, expect, it } from 'vitest';
import {
    ActionTransformLine,
    ActionReduce,
    ActionSetValue,
    ActionFilterLine,
    ActionJsonStringify,
    ActionJsonParse,
    WandlerPipeline,
    ActionUnique
} from '../../../src/textwandler';

describe('Test of WandlerPipeline', () => {
    it('should execute actions', () => {
        const pipeline = new WandlerPipeline();
        pipeline
            .addAction(
                new ActionFilterLine((input: string) => {
                    return !input.includes('d');
                })
            )
            .addAction(
                new ActionTransformLine((input: string) => {
                    return input + '1';
                })
            )
            .addAction(
                new ActionSetValue((input: string) => {
                    return 'a' + input;
                })
            )
            .addAction(
                new ActionTransformLine((input: string) => {
                    return input + '2';
                })
            )
            .addAction(
                new ActionTransformLine((input: string) => {
                    return input.replaceAll('b', 'd');
                })
            );

        const result = pipeline.run('abc\nabc\nabd\nabc');
        expect(result).toMatchInlineSnapshot(`
          "aadc12
          adc12
          adc12"
        `);
    });

    it('should execute reduce action', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(
            new ActionReduce(
                (
                    result: number,
                    line: string,
                    _currentIndex: number,
                    _inputArray: string[]
                ) => {
                    if (parseInt(line)) {
                        result += parseInt(line);
                    }

                    return result;
                },
                0
            )
        );

        const result = pipeline.run(
            'a\n' + 'b\n' + '1\n' + 'c\n' + '1\n' + '2\n' + 'x\n' + 'y\n' + 'z'
        );
        expect(result).toMatchInlineSnapshot(`"4"`);
    });

    it('should execute jsonStringify action', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionJsonStringify(4));

        expect(
            pipeline.run(
                '{\n' +
                    '   "string":"Hello, World!",\n' +
                    '   "number":42,\n' +
                    '   "float":3.14,\n' +
                    '   "boolean":true,\n' +
                    '   "null":null,\n' +
                    '   "object":{\n' +
                    '      "key":"value",\n' +
                    '      "nestedObject":{\n' +
                    '         "nestedKey":"nestedValue"\n' +
                    '      }\n' +
                    '   },\n' +
                    '   "array":[\n' +
                    '      1,\n' +
                    '      "two",\n' +
                    '      false,\n' +
                    '      null,\n' +
                    '      {\n' +
                    '         "key":"value"\n' +
                    '      }\n' +
                    '   ]\n' +
                    '}'
            )
        ).toMatchInlineSnapshot(`
          "{
              "string": "Hello, World!",
              "number": 42,
              "float": 3.14,
              "boolean": true,
              "null": null,
              "object": {
                  "key": "value",
                  "nestedObject": {
                      "nestedKey": "nestedValue"
                  }
              },
              "array": [
                  1,
                  "two",
                  false,
                  null,
                  {
                      "key": "value"
                  }
              ]
          }"
        `);
    });

    it('should execute jsonParse action', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(
            new ActionJsonParse((json) => {
                (json.number as number)++;
                return json;
            })
        );
        pipeline.addAction(new ActionJsonStringify(4));

        expect(
            pipeline.run(
                '{\n' +
                    '   "string":"Hello, World!",\n' +
                    '   "number":42,\n' +
                    '   "float":3.14,\n' +
                    '   "boolean":true,\n' +
                    '   "null":null,\n' +
                    '   "object":{\n' +
                    '      "key":"value",\n' +
                    '      "nestedObject":{\n' +
                    '         "nestedKey":"nestedValue"\n' +
                    '      }\n' +
                    '   },\n' +
                    '   "array":[\n' +
                    '      1,\n' +
                    '      "two",\n' +
                    '      false,\n' +
                    '      null,\n' +
                    '      {\n' +
                    '         "key":"value"\n' +
                    '      }\n' +
                    '   ]\n' +
                    '}'
            )
        ).toMatchInlineSnapshot(`
          "{
              "string": "Hello, World!",
              "number": 43,
              "float": 3.14,
              "boolean": true,
              "null": null,
              "object": {
                  "key": "value",
                  "nestedObject": {
                      "nestedKey": "nestedValue"
                  }
              },
              "array": [
                  1,
                  "two",
                  false,
                  null,
                  {
                      "key": "value"
                  }
              ]
          }"
        `);
    });

    it('should execute unique action', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionUnique());

        const result = pipeline.run(
            'a\n' + 'b\n' + 'a\n' + 'a\n' + 'A\n' + 'c\n' + '1\n' + '1\n' + '2'
        );
        expect(result).toMatchInlineSnapshot(`
          "a
          b
          A
          c
          1
          2"
        `);
    });
});
