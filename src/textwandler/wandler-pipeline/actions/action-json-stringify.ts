import { Action, ActionResult } from './action';
import { parse } from 'json5';

export class ActionJsonStringify extends Action {
    public readonly name: string = 'JsonStringify';

    private readonly indentation: number;

    constructor(indentation = 2) {
        super();
        this.indentation = indentation;
    }

    run(input: ActionResult): ActionResult {
        if (input.lastActionName === 'JsonParse') {
            input.text = JSON.stringify(
                input.customPayload,
                null,
                this.indentation
            );
        } else {
            input.text = JSON.stringify(
                parse(input.text),
                null,
                this.indentation
            );
        }

        return input;
    }
}
