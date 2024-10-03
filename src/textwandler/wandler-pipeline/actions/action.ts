export interface ActionResult {
    text: string;
    lastActionName: string;
    customPayload?: unknown;
    lines?: string[];
    step: number;
}

export abstract class Action {
    public readonly name: string;

    abstract run(input: ActionResult): ActionResult;
}
