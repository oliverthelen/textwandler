import { WandlerPipeline } from '../../../src/textwandler/wandler-pipeline/pipeline';
import { ActionTransformLine } from '../../../src/textwandler/wandler-pipeline/actions/action-transform-line';
import { ActionSetValue } from '../../../src/textwandler/wandler-pipeline/actions/action-set-value';
import { ActionFilterLine } from '../../../src/textwandler/wandler-pipeline/actions/action-filter-line';

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
});
