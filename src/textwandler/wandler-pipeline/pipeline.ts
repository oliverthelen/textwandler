import { Action, ActionResult } from './actions/action';
import { ActionTransformLine } from './actions/action-transform-line';
import { ActionFilterLine } from './actions/action-filter-line';
import { ActionSetValue } from './actions/action-set-value';

export class WandlerPipeline {
    private actions: Action[] = [];

    constructor(actions?: Action[]) {
        if (actions) {
            this.actions = actions;
        }
    }

    public addAction(action: Action): WandlerPipeline {
        this.actions.push(action);
        return this;
    }

    public run(inputString: string): string {
        const actionResult = this.actions.reduce<ActionResult>(
            (previousValue, currentValue, currentIndex) => {
                return currentValue.run({
                    ...previousValue,
                    step: previousValue.step + 1
                });
            },
            { text: inputString, step: 0 }
        );

        return actionResult.text;
    }

    public getActionsForContext() {
        return {
            filterLine: (
                lineMapper: (line: string, lineNumber: number) => boolean
            ) => {
                this.addAction(new ActionFilterLine(lineMapper));
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
