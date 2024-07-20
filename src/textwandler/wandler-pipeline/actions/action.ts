export interface ActionResult {
    text: string;
    lines?: string[];
    step: number;
}

export abstract class Action {
    abstract run(input: ActionResult): ActionResult;
}
