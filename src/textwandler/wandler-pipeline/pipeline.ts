import { Action, ActionResult } from './actions/action';
import { ActionTransformLine } from './actions/action-transform-line';
import { ActionFilterLine } from './actions/action-filter-line';
import { ActionSetValue } from './actions/action-set-value';
import { ActionReduce } from './actions/action-reduce';

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
            { text: inputString, step: 0 }
        );

        return actionResult.text;
    }

    public getActions() {
        return this.actions;
    }

    public getActionsForContext() {
        return {
            filterLine: (
                lineMapper: (line: string, lineNumber: number) => boolean
            ) => {
                this.addAction(new ActionFilterLine(lineMapper));
            },
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
            transformLine: (
                lineMapper: (line: string, lineNumber: number) => string
            ) => {
                this.addAction(new ActionTransformLine(lineMapper));
            }
        };
    }
}
