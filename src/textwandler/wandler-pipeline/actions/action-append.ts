import { Action, ActionResult } from './action';

export class ActionAppend extends Action {
    public readonly name: string = 'Append';

    constructor(private readonly suffix: string) {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        const appendedLines = lines.map((line) => line + this.suffix);
        input.text = appendedLines.join('\n');
        return input;
    }
}
