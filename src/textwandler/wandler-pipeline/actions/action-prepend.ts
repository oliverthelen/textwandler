import { Action, ActionResult } from './action';

export class ActionPrepend extends Action {
    public readonly name: string = 'Prepend';

    constructor(private readonly prefix: string) {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        const prependedLines = lines.map(line => this.prefix + line);
        input.text = prependedLines.join('\n');
        return input;
    }
}