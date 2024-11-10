import * as monaco from 'monaco-editor';
import { Editor } from '../editor/editor';
import {
    INITIAL_EDITOR_CONTENT,
    INITIAL_INPUT_CONTENT
} from '../editor/initial-editor-content';
import { DiffEditor } from '../editor/diff-editor';
import * as _ from 'lodash';
import {
    ClipboardCopy,
    createElement,
    Diff,
    Github,
    Play,
    Plus,
    RotateCcw,
    Settings,
    Trash
} from 'lucide';
import { StateManager } from './state-manager';
import { ActionRunStep, WandlerPipeline } from './wandler-pipeline/pipeline';
import {
    APP_ACTION_FUNCTIONS,
    APP_LODASH,
    APP_VERSION
} from '../helper/globals';
import { SideBySideEditor } from '../editor/side-by-side-editor';
import { kebabCase } from 'lodash';

enum OUTPUT_EDITOR_MODE {
    SIDE_BY_SIDE_EDITOR,
    DIFF_EDITOR
}

export class TextWandler {
    private static instance: TextWandler;
    private static stateManager: StateManager;

    outputEditorMode = OUTPUT_EDITOR_MODE.SIDE_BY_SIDE_EDITOR;

    private codeEditor: Editor;
    private textEditor: SideBySideEditor | DiffEditor;

    private state: EditorState;

    private constructor() {
        this.setupUI();
        this.setupMonaco();

        this.codeEditor = new Editor(INITIAL_EDITOR_CONTENT, 'code-editor');
        if (this.outputEditorMode === OUTPUT_EDITOR_MODE.SIDE_BY_SIDE_EDITOR) {
            this.textEditor = new SideBySideEditor(
                INITIAL_INPUT_CONTENT,
                'side-by-side-editor'
            );
        } else {
            this.textEditor = new DiffEditor(
                INITIAL_INPUT_CONTENT,
                'diff-editor'
            );
        }

        this.handleOldEditorState().then(async () => {
            let state = await TextWandler.stateManager.getLatestEditorState();

            if (!state) {
                state = {
                    id: self.crypto.randomUUID(),
                    name: 'Last State',
                    savedAt: new Date(),
                    codeEditorContent: INITIAL_EDITOR_CONTENT,
                    diffEditorContent: INITIAL_INPUT_CONTENT
                };
            }

            this.loadEditorState(state);
        });
    }

    public static async getInstance(): Promise<TextWandler> {
        if (!this.stateManager) {
            this.stateManager = await StateManager.getInstance();
        }
        if (!TextWandler.instance) {
            TextWandler.instance = new TextWandler();
        }

        return TextWandler.instance;
    }

    // SETUP

    // Loads the available functions for the user as ExtraLibs into monaco, so it can provide code completion and hints
    private setupMonaco() {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
            APP_ACTION_FUNCTIONS,
            `ts:action-functions.d.ts`
        );

        Object.entries(APP_LODASH).forEach(([key, content]) => {
            if (key === 'index') {
                monaco.languages.typescript.javascriptDefaults.addExtraLib(
                    content,
                    '@types/lodash/index.d.ts'
                );
            } else {
                monaco.languages.typescript.javascriptDefaults.addExtraLib(
                    content,
                    `@types/lodash/common/${key}.d.ts`
                );
            }
        });
    }

    private setupUI() {
        this.setupMenuBar();

        document
            .querySelector('#button-clipboard')
            .addEventListener('click', () => this.copyOutputToClipBoard());
        document
            .querySelector('#button-switch-editor-mode')
            .addEventListener('click', () => this.switchEditorMode());
        document
            .querySelector('#button-run')
            .addEventListener('click', () => this.runFunction());
        document
            .querySelector('#button-reset')
            .addEventListener('click', () => this.resetTextEditor());
        document
            .querySelector('#button-settings')
            .addEventListener('click', () => this.showSettingsScreen());
        document
            .querySelector('#settings-reset')
            .addEventListener('click', () => this.resetCodeEditor());
        document
            .querySelector('#settings-return')
            .addEventListener('click', () => this.showEditor());
        document
            .querySelector('#error-output-close')
            .addEventListener('click', () => this.showEditor());
        document
            .querySelector('#button-new-editor-state')
            .addEventListener('click', () => this.newEditorState());
        document
            .querySelector('#button-delete-editor-state')
            .addEventListener('click', () => {
                if (
                    confirm(
                        `Are you sure you want to delete the current state '${this.state.name}' ?`
                    )
                ) {
                    this.deleteCurrentEditorState();
                }
            });
        document
            .querySelector('#button-github')
            .addEventListener('click', () => this.goToGithub());
        document
            .querySelector('#editor-state-name')
            .addEventListener('change', this.setEditorStateName.bind(this));
        document
            .querySelector('#select-editor-state')
            .addEventListener('change', this.loadEditorStateById.bind(this));

        document.querySelector('#APP_VERSION').textContent = APP_VERSION;
    }

    private setupMenuBar() {
        const playIcon = createElement(Play);
        playIcon.setAttribute('stroke', '#FFF');
        playIcon.setAttribute('height', '16px');
        document.getElementById('button-run').appendChild(playIcon);

        const rotateCcwIcon = createElement(RotateCcw);
        rotateCcwIcon.setAttribute('stroke', '#FFF');
        rotateCcwIcon.setAttribute('height', '16px');
        document.getElementById('button-reset').appendChild(rotateCcwIcon);

        const clipboardCopyIcon = createElement(ClipboardCopy);
        clipboardCopyIcon.setAttribute('stroke', '#FFF');
        clipboardCopyIcon.setAttribute('height', '16px');
        document
            .getElementById('button-clipboard')
            .appendChild(clipboardCopyIcon);

        const diffIcon = createElement(Diff);
        diffIcon.setAttribute('stroke', '#FFF');
        diffIcon.setAttribute('height', '18px');
        document
            .getElementById('button-switch-editor-mode')
            .appendChild(diffIcon);

        const circleHelp = createElement(Settings);
        circleHelp.setAttribute('stroke', '#FFF');
        circleHelp.setAttribute('height', '16px');
        document.getElementById('button-settings').appendChild(circleHelp);

        const plusIcon = createElement(Plus);
        plusIcon.setAttribute('stroke', '#FFF');
        plusIcon.setAttribute('height', '20px');
        document
            .getElementById('button-new-editor-state')
            .appendChild(plusIcon);

        const trashIcon = createElement(Trash);
        trashIcon.setAttribute('stroke', '#FFF');
        trashIcon.setAttribute('height', '16px');
        document
            .getElementById('button-delete-editor-state')
            .appendChild(trashIcon);
    }

    // UI

    private showEditor() {
        document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('error-output').style.display = 'none';
        document.getElementById('editor-container').style.display = 'block';
        if (this.outputEditorMode === OUTPUT_EDITOR_MODE.DIFF_EDITOR) {
            document.getElementById('diff-editor').style.display = 'block';
        } else {
            document.getElementById('side-by-side-editor').style.display =
                'block';
        }
    }

    private showSettingsScreen() {
        document.getElementById('settings-screen').style.display = 'block';
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('editor-container').style.display = 'none';
    }

    private showWelcomeScreen() {
        document.getElementById('welcome-screen').style.display = 'block';
        document.getElementById('editor-container').style.display = 'none';
    }

    public goToGithub() {
        window
            .open('https://github.com/oliverthelen/textwandler', '_blank')
            .focus();
    }

    // STATE

    private async setEditorStateName(event: Event) {
        const name: string = (event.target as HTMLInputElement).value;
        this.state.name = name.trim();
        await TextWandler.stateManager.upsertEditorState(this.state);
        await this.updateStateSelect();
    }

    private async newEditorState() {
        const state = {
            id: self.crypto.randomUUID(),
            name: 'New State',
            savedAt: new Date(),
            codeEditorContent: INITIAL_EDITOR_CONTENT,
            diffEditorContent: INITIAL_INPUT_CONTENT
        };

        await TextWandler.stateManager.upsertEditorState(state);
        await this.loadEditorState(state);
    }

    private async deleteCurrentEditorState() {
        const states = await TextWandler.stateManager.getEditorStates();
        if (states.length < 2) return;

        await TextWandler.stateManager.deleteEditorState(this.state.id);
        const state = await TextWandler.stateManager.getLatestEditorState();
        await this.loadEditorState(state);
    }

    private async loadEditorState(state: EditorState) {
        this.state = state;
        this.codeEditor.setValue(state.codeEditorContent);
        this.textEditor.getOriginalModel().setValue(state.diffEditorContent);

        const stateName: HTMLInputElement = document.getElementById(
            'editor-state-name'
        ) as HTMLInputElement;
        stateName.value = this.state.name;
        await this.updateStateSelect();
    }

    private async loadEditorStateById(event: Event) {
        const stateId: string = (event.target as HTMLSelectElement).value;
        const state = await TextWandler.stateManager.getEditorState(stateId);
        await this.loadEditorState(state);
    }

    private async updateStateSelect() {
        const states = await TextWandler.stateManager.getEditorStates();
        const select: HTMLSelectElement = document.getElementById(
            'select-editor-state'
        ) as HTMLSelectElement;
        let selectedIndex = 0;
        select.innerHTML = states
            .map((state, index) => {
                if (state.id === this.state.id) selectedIndex = index;
                return `<option value="${state.id}" selected="${state.id === this.state.id ? 'selected' : ''}">${state.name}</option>`;
            })
            .join('\n');
        select.selectedIndex = selectedIndex;
    }

    /**
     * Transform the old local storage singular state to a new IndexedDb state
     * @private
     */
    private async handleOldEditorState() {
        const lastState = localStorage.getItem('editor-last-state');
        if (!lastState) return;
        const lastStateJson = JSON.parse(
            localStorage.getItem('editor-last-state')
        );
        await TextWandler.stateManager.upsertEditorState({
            id: self.crypto.randomUUID(),
            name: 'Last State',
            ...lastStateJson
        });
        localStorage.removeItem('editor-last-state');
    }

    // CLIPBOARD

    public copyOutputToClipBoard() {
        try {
            navigator.clipboard.writeText(
                this.textEditor.modifiedModel.getValue()
            );
        } catch (error) {
            console.error(error.message);
        }
    }

    // SWITCH EDITOR MODE

    public switchEditorMode() {
        if (this.outputEditorMode === OUTPUT_EDITOR_MODE.SIDE_BY_SIDE_EDITOR) {
            this.outputEditorMode = OUTPUT_EDITOR_MODE.DIFF_EDITOR;
            document.getElementById('side-by-side-editor').style.display =
                'none';
            const editorValue = this.textEditor.getOriginalModel().getValue();
            const editorModifiedValue = this.textEditor
                .getModifiedModel()
                .getValue();
            this.textEditor.dispose();
            this.textEditor = new DiffEditor(
                editorValue,
                'diff-editor',
                editorModifiedValue
            );
        } else {
            this.outputEditorMode = OUTPUT_EDITOR_MODE.SIDE_BY_SIDE_EDITOR;
            document.getElementById('diff-editor').style.display = 'none';
            const editorValue = this.textEditor.getOriginalModel().getValue();
            const editorModifiedValue = this.textEditor
                .getModifiedModel()
                .getValue();
            this.textEditor.dispose();
            this.textEditor = new SideBySideEditor(
                editorValue,
                'side-by-side-editor',
                editorModifiedValue
            );
        }
    }

    // RESETTING

    public resetCodeEditor() {
        localStorage.removeItem('editor-last-state');
        this.codeEditor.setValue(INITIAL_EDITOR_CONTENT);
        this.textEditor.originalModel.setValue(INITIAL_INPUT_CONTENT);
    }

    public resetTextEditor() {
        this.textEditor.reset();
    }

    // EXECUTING USER INPUT

    private evalInScope(js: string, contextAsScope: unknown) {
        return new Function(
            `with (this) { return ((() => { ${js} \n })()); }`
        ).call(contextAsScope);
    }

    private drawActionRunSteps(actionRunSteps: ActionRunStep[]) {
        const stepsParent = document.getElementById('code-editor-steps');
        stepsParent.innerHTML = '';

        actionRunSteps.forEach((actionRunStep, index, actions) => {
            const newStep = document.createElement('div');
            newStep.className = 'code-editor-step'; // step-transform-line
            if (actionRunStep.resultType === 'error') {
                newStep.className += ` step-result-error`;
            } else {
                newStep.className += ` step-${kebabCase(actionRunStep.action.name)}`;
            }

            const newStepTitleWrapper = document.createElement('span');
            newStepTitleWrapper.className = 'code-editor-step-title';

            const newStepTitle = document.createElement('span');
            newStepTitle.innerHTML = `${actionRunStep.action.name}`;

            const newStepDuration = document.createElement('span');
            newStepDuration.innerHTML = `${Math.ceil(actionRunStep.duration)}ms`;
            newStepDuration.className = 'code-editor-step-duration';

            newStepTitleWrapper.appendChild(newStepTitle);
            newStepTitleWrapper.appendChild(document.createElement('br'));
            newStepTitleWrapper.appendChild(newStepDuration);

            newStep.appendChild(newStepTitleWrapper);
            stepsParent.appendChild(newStep);

            if (index < actions.length - 1) {
                const nextStepArrow = document.createElement('div');
                nextStepArrow.className = 'code-editor-step-arrow';
                nextStepArrow.innerHTML = '→';
                stepsParent.appendChild(nextStepArrow);
            }
        });
    }

    public async runFunction() {
        this.state.savedAt = new Date();
        this.state.codeEditorContent = this.codeEditor.getValue();
        this.state.diffEditorContent = this.textEditor
            .getOriginalModel()
            .getValue();

        await TextWandler.stateManager.upsertEditorState(this.state);

        document.getElementById('editor-container').style.display = 'block';
        document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('error-output').style.display = 'none';
        if (this.outputEditorMode === OUTPUT_EDITOR_MODE.DIFF_EDITOR) {
            document.getElementById('diff-editor').style.display = 'block';
        } else {
            document.getElementById('side-by-side-editor').style.display =
                'block';
        }

        const pipeline = new WandlerPipeline();

        try {
            this.evalInScope(this.codeEditor.getValue(), {
                _,
                ...pipeline.getActionsForContext()
            });

            this.textEditor
                .getModifiedModel()
                .setValue(
                    pipeline.run(
                        this.textEditor.originalModel.getValue(),
                        this.drawActionRunSteps
                    )
                );
        } catch (e) {
            document.getElementById('error-output-content').innerHTML =
                `Error: ${e}`;
            document.getElementById('error-output').style.display = 'block';
            if (this.outputEditorMode === OUTPUT_EDITOR_MODE.DIFF_EDITOR) {
                document.getElementById('diff-editor').style.display = 'none';
            } else {
                document.getElementById('side-by-side-editor').style.display =
                    'none';
            }
        }
    }
}
