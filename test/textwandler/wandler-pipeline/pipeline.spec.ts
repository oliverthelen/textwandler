import { WandlerPipeline } from '../../../src/textwandler/wandler-pipeline/pipeline';
import { ActionTransformLine } from '../../../src/textwandler/wandler-pipeline/actions/action-transform-line';
import { ActionSetValue } from '../../../src/textwandler/wandler-pipeline/actions/action-set-value';
import { ActionFilterLine } from '../../../src/textwandler/wandler-pipeline/actions/action-filter-line';
import { ActionReduce } from '../../../src/textwandler/wandler-pipeline/actions/action-reduce';

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
        expect(result).toEqual('aadc12\nadc12\nadc12');
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
        expect(result).toEqual('4');
    });
});
