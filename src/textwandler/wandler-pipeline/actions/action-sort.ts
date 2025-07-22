import { Action, ActionResult } from './action';

export class ActionSort extends Action {
    public readonly name: string = 'Sort';

    constructor(
        private readonly comparatorFunction?: (a: string, b: string) => number
    ) {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        const sortedLines = this.comparatorFunction
            ? lines.sort(this.comparatorFunction)
            : lines.sort();
        
        input.text = sortedLines.join('\n');
        return input;
    }
}