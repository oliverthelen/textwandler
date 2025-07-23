import { Action, ActionResult } from './action';

export class ActionJoin extends Action {
    public readonly name: string = 'Join';

    constructor(private readonly separator: string = '\n') {
        super();
    }

    run(input: ActionResult): ActionResult {
        const lines = input.text.split(/\n/);
        input.text = lines.join(this.separator);
        return input;
    }
}
