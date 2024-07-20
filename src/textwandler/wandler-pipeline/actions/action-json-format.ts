import { Action, ActionResult } from './action';

export class ActionJsonFormat extends Action {
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
