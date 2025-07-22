import { Action, ActionResult } from './action';

export class ActionReplace extends Action {
    public readonly name: string = 'Replace';

    constructor(
        private readonly searchValue: string | RegExp,
        private readonly replaceValue: string,
        private readonly flags?: string
    ) {
        super();
    }

    run(input: ActionResult): ActionResult {
        if (typeof this.searchValue === 'string') {
            // String replacement
            const regex = new RegExp(
                this.escapeRegExp(this.searchValue),
                this.flags || 'g'
            );
            input.text = input.text.replace(regex, this.replaceValue);
        } else {
            // RegExp replacement
            input.text = input.text.replace(this.searchValue, this.replaceValue);
        }
        
        return input;
    }

    private escapeRegExp(string: string): string {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}