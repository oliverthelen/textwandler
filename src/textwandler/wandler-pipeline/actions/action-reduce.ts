import { Action, ActionResult } from './action';

export class ActionReduce extends Action {
    private readonly reduceFunction: (
        result: any,
        currentLine: string,
        currentIndex: number,
        inputArray: string[]
    ) => any;
    private readonly initialValue: any;

    constructor(
        reduceFunction: (
            result: any,
            currentLine: string,
            currentIndex: number,
            inputArray: string[]
        ) => any,
        initialValue: any
    ) {
        super();
        this.reduceFunction = reduceFunction;
        this.initialValue = initialValue;
    }

    run(input: ActionResult): ActionResult {
        input.text = input.text
            .split(/\n/)
            .reduce(this.reduceFunction, this.initialValue)
            .toString();
        return input;
    }
}