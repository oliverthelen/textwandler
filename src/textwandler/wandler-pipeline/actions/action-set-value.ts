import { Action, ActionResult } from './action';

export class ActionSetValue extends Action {
    public readonly name: string = 'SetValue';

    private readonly transformFunction: (input: string) => string;

    constructor(transformFunction: (input: string) => string) {
        super();
        this.transformFunction = transformFunction;
    }

    run(input: ActionResult): ActionResult {
        input.text = this.transformFunction(input.text);
        if (typeof input.text === 'string') return input;
        input.text = JSON.stringify(input.text, null, 2);
        return input;
    }
}
