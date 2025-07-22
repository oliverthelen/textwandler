import { Action, ActionResult } from './action';

export class ActionSlice extends Action {
    public readonly name: string = 'Slice';

    constructor(
        private readonly start: number,
        private readonly end?: number
    ) {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        const slicedLines = lines.slice(this.start, this.end);
        input.text = slicedLines.join('\n');
        return input;
    }
}