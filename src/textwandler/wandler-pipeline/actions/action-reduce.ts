import { Action, ActionResult } from './action';

export class ActionReduce extends Action {
    public readonly name: string = 'Reduce';

    private readonly reduceFunction: (
        result: any,
        currentLine: string,
        currentIndex: number,
        inputLinesArray: string[]
    ) => any;
    private readonly initialValue: any;

    constructor(
        reduceFunction: (
            result: any,
            currentLine: string,
            currentIndex: number,
            inputLinesArray: string[]
        ) => any,
        initialValue?: any
    ) {
        super();
        this.reduceFunction = reduceFunction;
        this.initialValue = initialValue ?? '';
    }

    run(input: ActionResult): ActionResult {
        input.text = input.text
            .split(/\n/)
            .reduce(this.reduceFunction, this.initialValue)
            .toString();
        return input;
    }
}
