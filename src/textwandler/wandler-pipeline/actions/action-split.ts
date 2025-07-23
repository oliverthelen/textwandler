import { Action, ActionResult } from './action';

export class ActionSplit extends Action {
    public readonly name: string = 'Split';

    constructor(private readonly separator: string | RegExp) {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        const allSplitParts: string[] = [];

        lines.forEach((line) => {
            const parts = line.split(this.separator);
            allSplitParts.push(...parts);
        });

        input.text = allSplitParts.join('\n');
        return input;
    }
}
