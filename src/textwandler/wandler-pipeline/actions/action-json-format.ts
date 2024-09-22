import { Action, ActionResult } from './action';

export class ActionJsonFormat extends Action {
    public readonly name: string = 'JsonFormat';

    private readonly transformFunction: (input: string) => string;

    constructor(transformFunction: (input: string) => string) {
        super();
        this.transformFunction = transformFunction;
    }

    run(input: ActionResult): ActionResult {
        input.text = this.transformFunction(input.text);
        return input;
    }
}
