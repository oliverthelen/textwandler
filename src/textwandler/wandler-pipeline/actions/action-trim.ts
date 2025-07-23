import { Action, ActionResult } from './action';

export class ActionTrim extends Action {
    public readonly name: string = 'Trim';

    constructor(private readonly mode: 'both' | 'start' | 'end' = 'both') {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        const trimmedLines = lines.map((line) => {
            switch (this.mode) {
                case 'start':
                    return line.trimStart();
                case 'end':
                    return line.trimEnd();
                case 'both':
                default:
                    return line.trim();
            }
        });

        input.text = trimmedLines.join('\n');
        return input;
    }
}
