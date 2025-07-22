import { Action, ActionResult } from './action';

export class ActionGrep extends Action {
    public readonly name: string = 'Grep';

    constructor(
        private readonly pattern: string | RegExp,
        private readonly invert: boolean = false
    ) {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);

        let regex: RegExp;
        if (typeof this.pattern === 'string') {
            regex = new RegExp(this.pattern);
        } else {
            regex = this.pattern;
        }

        const filteredLines = lines.filter((line) => {
            const matches = regex.test(line);
            return this.invert ? !matches : matches;
        });

        input.text = filteredLines.join('\n');
        return input;
    }
}
