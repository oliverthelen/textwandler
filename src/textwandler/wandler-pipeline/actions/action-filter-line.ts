import { Action, ActionResult } from './action';

export class ActionFilterLine extends Action {
    private readonly transformFunction: (
        input: string,
        lineNumber: number
    ) => boolean;

    constructor(
        transformFunction: (input: string, lineNumber: number) => boolean
    ) {
        super();
        this.transformFunction = transformFunction;
    }

    run(input: ActionResult): ActionResult {
        input.text = input.text
            .split(/\n/)
            .filter((i, index) => {
                return this.transformFunction(i, index);
            })
            .join('\n');
        return input;
    }
}
