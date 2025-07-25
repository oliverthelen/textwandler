import { describe, expect, it } from 'vitest';
import {
    ActionAppend,
    ActionTransformLine,
    ActionReduce,
    ActionSetValue,
    ActionFilterLine,
    ActionGrep,
    ActionJoin,
    ActionJsonStringify,
    ActionJsonParse,
    WandlerPipeline,
    ActionPrepend,
    ActionReplace,
    ActionReverse,
    ActionSlice,
    ActionSort,
    ActionSplit,
    ActionTrim,
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

    it('should execute prepend action with simple prefix', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionPrepend('> '));

        const result = pipeline.run('first line\nsecond line\nthird line');
        expect(result).toMatchInlineSnapshot(`
          "> first line
          > second line
          > third line"
        `);
    });

    it('should execute prepend action with numbered prefix', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionPrepend('TODO: '));

        const result = pipeline.run('fix bug\nwrite tests\nupdate docs');
        expect(result).toMatchInlineSnapshot(`
          "TODO: fix bug
          TODO: write tests
          TODO: update docs"
        `);
    });

    it('should execute prepend action with special characters', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionPrepend('- [ ] '));

        const result = pipeline.run('task one\ntask two\ntask three');
        expect(result).toMatchInlineSnapshot(`
          "- [ ] task one
          - [ ] task two
          - [ ] task three"
        `);
    });

    it('should execute slice action with start and end', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSlice(1, 3));

        const result = pipeline.run('line0\nline1\nline2\nline3\nline4');
        expect(result).toMatchInlineSnapshot(`
          "line1
          line2"
        `);
    });

    it('should execute slice action with only start', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSlice(2));

        const result = pipeline.run('line0\nline1\nline2\nline3\nline4');
        expect(result).toMatchInlineSnapshot(`
          "line2
          line3
          line4"
        `);
    });

    it('should execute slice action with negative start', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSlice(-2));

        const result = pipeline.run('line0\nline1\nline2\nline3\nline4');
        expect(result).toMatchInlineSnapshot(`
          "line3
          line4"
        `);
    });

    it('should execute reverse action', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionReverse());

        const result = pipeline.run('first\nsecond\nthird\nfourth');
        expect(result).toMatchInlineSnapshot(`
          "fourth
          third
          second
          first"
        `);
    });

    it('should execute sort action with default alphabetical sorting', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSort());

        const result = pipeline.run('zebra\napple\nbanana\ncherry');
        expect(result).toMatchInlineSnapshot(`
          "apple
          banana
          cherry
          zebra"
        `);
    });

    it('should execute sort action with custom comparator function', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSort((a, b) => b.localeCompare(a)));

        const result = pipeline.run('zebra\napple\nbanana\ncherry');
        expect(result).toMatchInlineSnapshot(`
          "zebra
          cherry
          banana
          apple"
        `);
    });

    it('should execute sort action with numeric sorting', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSort((a, b) => parseInt(a) - parseInt(b)));

        const result = pipeline.run('100\n2\n30\n1');
        expect(result).toMatchInlineSnapshot(`
          "1
          2
          30
          100"
        `);
    });

    it('should execute append action with simple suffix', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionAppend(' ✓'));

        const result = pipeline.run('first line\nsecond line\nthird line');
        expect(result).toMatchInlineSnapshot(`
          "first line ✓
          second line ✓
          third line ✓"
        `);
    });

    it('should execute append action with semicolon suffix', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionAppend(';'));

        const result = pipeline.run(
            'statement one\nstatement two\nstatement three'
        );
        expect(result).toMatchInlineSnapshot(`
          "statement one;
          statement two;
          statement three;"
        `);
    });

    it('should execute append action with extension suffix', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionAppend('.txt'));

        const result = pipeline.run('file1\nfile2\nfile3');
        expect(result).toMatchInlineSnapshot(`
          "file1.txt
          file2.txt
          file3.txt"
        `);
    });

    it('should execute grep action with string pattern', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionGrep('error'));

        const result = pipeline.run(
            'info: starting\nerror: failed\nwarn: issue\nerror: timeout'
        );
        expect(result).toMatchInlineSnapshot(`
          "error: failed
          error: timeout"
        `);
    });

    it('should execute grep action with regex pattern', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionGrep(/^\d+/));

        const result = pipeline.run(
            '123 number line\ntext line\n456 another number\nmore text'
        );
        expect(result).toMatchInlineSnapshot(`
          "123 number line
          456 another number"
        `);
    });

    it('should execute grep action with invert flag', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionGrep('error', true));

        const result = pipeline.run(
            'info: starting\nerror: failed\nwarn: issue\nerror: timeout'
        );
        expect(result).toMatchInlineSnapshot(`
          "info: starting
          warn: issue"
        `);
    });

    it('should execute split action with comma separator', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSplit(','));

        const result = pipeline.run('apple,banana,cherry\ngrape,kiwi,mango');
        expect(result).toMatchInlineSnapshot(`
          "apple
          banana
          cherry
          grape
          kiwi
          mango"
        `);
    });

    it('should execute split action with regex separator', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSplit(/\s+/));

        const result = pipeline.run(
            'hello   world\tfrom    split\naction   test'
        );
        expect(result).toMatchInlineSnapshot(`
          "hello
          world
          from
          split
          action
          test"
        `);
    });

    it('should execute split action with pipe separator', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionSplit(' | '));

        const result = pipeline.run('first | second | third\nfourth | fifth');
        expect(result).toMatchInlineSnapshot(`
          "first
          second
          third
          fourth
          fifth"
        `);
    });

    it('should execute trim action with both sides', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionTrim('both'));

        const result = pipeline.run('  line1  \n\t\tline2\t\t\n   line3   ');
        expect(result).toMatchInlineSnapshot(`
          "line1
          line2
          line3"
        `);
    });

    it('should execute trim action with start only', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionTrim('start'));

        const result = pipeline.run('  line1  \n\t\tline2\t\t\n   line3   ');
        expect(result).toMatchInlineSnapshot(`
          "line1  
          line2\t\t
          line3   "
        `);
    });

    it('should execute trim action with end only', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionTrim('end'));

        const result = pipeline.run('  line1  \n\t\tline2\t\t\n   line3   ');
        expect(result).toMatchInlineSnapshot(`
          "  line1
          \t\tline2
             line3"
        `);
    });

    it('should execute replace action with string replacement', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionReplace('old', 'new'));

        const result = pipeline.run('old text\nold value\nkeep this old word');
        expect(result).toMatchInlineSnapshot(`
          "new text
          new value
          keep this new word"
        `);
    });

    it('should execute replace action with regex replacement', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionReplace(/\d+/g, 'NUMBER'));

        const result = pipeline.run('line 123\nvalue 456\nno numbers here');
        expect(result).toMatchInlineSnapshot(`
          "line NUMBER
          value NUMBER
          no numbers here"
        `);
    });

    it('should execute replace action with case insensitive flag', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionReplace('hello', 'hi', 'gi'));

        const result = pipeline.run('Hello world\nhello there\nHELLO everyone');
        expect(result).toMatchInlineSnapshot(`
          "hi world
          hi there
          hi everyone"
        `);
    });

    it('should execute join action with comma separator', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionJoin(', '));

        const result = pipeline.run('apple\nbanana\ncherry\ndate');
        expect(result).toMatchInlineSnapshot(`"apple, banana, cherry, date"`);
    });

    it('should execute join action with pipe separator', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionJoin(' | '));

        const result = pipeline.run('first\nsecond\nthird');
        expect(result).toMatchInlineSnapshot(`"first | second | third"`);
    });

    it('should execute join action with default separator', () => {
        const pipeline = new WandlerPipeline();
        pipeline.addAction(new ActionJoin());

        const result = pipeline.run('line1\nline2\nline3');
        expect(result).toMatchInlineSnapshot(`
          "line1
          line2
          line3"
        `);
    });
});
