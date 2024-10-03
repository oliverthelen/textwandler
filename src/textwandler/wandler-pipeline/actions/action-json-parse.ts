import { Action, ActionResult } from './action';
import { parse } from 'json5';

export class ActionJsonParse extends Action {
    public readonly name: string = 'JsonParse';

    private readonly transformJsonFunction: (
        json: Record<string, unknown>
    ) => Record<string, unknown>;

    constructor(
        transformJsonFunction: (
            json: Record<string, unknown>
        ) => Record<string, unknown>
    ) {
        super();
        this.transformJsonFunction = transformJsonFunction;
    }

    run(input: ActionResult): ActionResult {
        input.customPayload = this.transformJsonFunction(
            parse<Record<string, unknown>>(input.text)
        );
        return input;
    }
}
