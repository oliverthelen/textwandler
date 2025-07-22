import { Action, ActionResult } from './action';

export class ActionReverse extends Action {
    public readonly name: string = 'Reverse';

    constructor() {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        input.text = lines.reverse().join('\n');
        return input;
    }
}