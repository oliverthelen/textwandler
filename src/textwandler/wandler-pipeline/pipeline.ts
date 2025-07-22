import { Action, ActionResult } from './actions/action';
import { ActionAppend } from './actions/action-append';
import { ActionTransformLine } from './actions/action-transform-line';
import { ActionFilterLine } from './actions/action-filter-line';
import { ActionGrep } from './actions/action-grep';
import { ActionSetValue } from './actions/action-set-value';
import { ActionReduce } from './actions/action-reduce';
import { ActionJsonStringify } from './actions/action-json-stringify';
import { ActionJsonParse } from './actions/action-json-parse';
import { ActionSort } from './actions/action-sort';
import { ActionUnique } from './actions/action-unique';

export type ActionRunStep = {
    action: Action;
    duration: number;
    resultType: 'success' | 'error';
};

export class WandlerPipeline {
    private readonly actions: Action[] = [];
    private lastActionRun: ActionRunStep[] = [];

    constructor(actions?: Action[]) {
        if (actions) {
            this.actions = actions;
        }
    }

    public addAction(action: Action): WandlerPipeline {
        this.actions.push(action);
        return this;
    }

    public run(
        inputString: string,
        stepCallback?: (actionRunSteps: ActionRunStep[]) => void
    ): string {
        this.lastActionRun = [];

        const actionResult = this.actions.reduce<ActionResult>(
            (actionResult, action, currentIndex) => {
                let result: ActionResult;
                const actionRunStep: ActionRunStep = {
                    action: action,
                    duration: -1,
                    resultType: 'success'
                };
                this.lastActionRun.push(actionRunStep);

                const actionStartTime = performance.now();

                try {
                    result = action.run({
                        ...actionResult,
                        step: actionResult.step + 1
                    });
                    result.lastActionName = action.name;
                } catch (e) {
                    actionRunStep.duration =
                        performance.now() - actionStartTime;
                    actionRunStep.resultType = 'error';
                    if (stepCallback) stepCallback(this.lastActionRun);
                    throw e;
                }

                actionRunStep.duration = performance.now() - actionStartTime;
                if (stepCallback) stepCallback(this.lastActionRun);

                return result;
            },
            { text: inputString, step: 0, lastActionName: 'initial' }
        );

        return actionResult.text;
    }

    public getActions() {
        return this.actions;
    }

    public getActionsForContext() {
        const functions = {
            append: (suffix: string) => {
                this.addAction(new ActionAppend(suffix));
            },
            filterLine: (
                lineMapper: (line: string, lineNumber: number) => boolean
            ) => {
                this.addAction(new ActionFilterLine(lineMapper));
            },
            grep: (pattern: string | RegExp, invert?: boolean) => {
                this.addAction(new ActionGrep(pattern, invert));
            },
            jsonParse: (
                transformJsonFunction: (
                    input: Record<string, unknown>
                ) => Record<string, unknown>,
                indentation?: number
            ) => {
                this.addAction(new ActionJsonParse(transformJsonFunction));
                this.addAction(new ActionJsonStringify(indentation));
            },
            jsonStringify: (indentation?: number) =>
                this.addAction(new ActionJsonStringify(indentation)),
            reduce: (
                reduceFunction: (
                    result: string,
                    currentLine: string,
                    currentIndex: number,
                    inputArray: string[]
                ) => any,
                initialValue: any
            ) => {
                this.addAction(new ActionReduce(reduceFunction, initialValue));
            },
            setValue: (transformFunction: (input: string) => string) => {
                this.addAction(new ActionSetValue(transformFunction));
            },
            sort: (transformFunction?: (a: string, b: string) => number) => {
                this.addAction(new ActionSort(transformFunction));
            },
            transformLine: (
                lineMapper: (line: string, lineNumber: number) => string
            ) => {
                this.addAction(new ActionTransformLine(lineMapper));
            },
            unique: () => {
                this.addAction(new ActionUnique());
            }
        };

        return {
            ...functions,
            textwandler: functions,
            tw: functions
        };
    }
}
