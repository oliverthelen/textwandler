import { Action, ActionResult } from './action';

export class ActionTransformLine extends Action {
    public readonly name: string = 'TransformLine';

    private readonly transformFunction: (
        input: string,
        lineNumber: number
    ) => string;

    constructor(
        transformFunction: (input: string, lineNumber: number) => string
    ) {
        super();
        this.transformFunction = transformFunction;
    }

    run(input: ActionResult): ActionResult {
        input.text = input.text
            .split(/\n/)
            .map((i, index) => {
                return this.transformFunction(i, index);
            })
            .join('\n');
        return input;
    }
}
