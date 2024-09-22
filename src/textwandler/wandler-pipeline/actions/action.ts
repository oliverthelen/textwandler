export interface ActionResult {
    text: string;
    lines?: string[];
    step: number;
}

export abstract class Action {
    public readonly name: string;

    abstract run(input: ActionResult): ActionResult;
}
