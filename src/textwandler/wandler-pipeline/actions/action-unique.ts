import { Action, ActionResult } from './action';

export class ActionUnique extends Action {
    public readonly name: string = 'Unique';

    constructor() {
        super();
    }

    run(input: ActionResult): ActionResult {
        input.text = Array.from(new Set(input.text.split(/\n/))).join('\n');
        return input;
    }
}
