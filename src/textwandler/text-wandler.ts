import { Editor } from '../editor/editor';
import {
    INITIAL_EDITOR_CONTENT,
    INITIAL_INPUT_CONTENT
} from '../editor/initial-editor-content';
import { DiffEditor } from '../editor/diff-editor';
import { setupResizeHandler } from '../helper/resize-handler';
import * as _ from 'lodash';
import * as monaco from 'monaco-editor';
import {
    ClipboardCopy,
    createElement,
    Play,
    Plus,
    RotateCcw,
    Settings,
    Trash
} from 'lucide';
import { StateManager } from './state-manager';

enum OUTPUT_EDITOR_MODE {
    EDITOR,
    DIFF_EDITOR
}

export class TextWandler {
    private static instance: TextWandler;
    private static stateManager: StateManager;

    outputEditorMode = OUTPUT_EDITOR_MODE.DIFF_EDITOR;

    private codeEditor: Editor;
    private diffEditor: Editor | DiffEditor;

    private state: EditorState;

    private constructor() {
        this.setupUI();

        this.codeEditor = new Editor(INITIAL_EDITOR_CONTENT, 'code-editor');
        this.diffEditor = new DiffEditor(INITIAL_INPUT_CONTENT, 'diff-editor');

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

    private setupUI() {
        this.setupMenuBar();
        setupResizeHandler();

        document
            .querySelector('#button-clipboard')
            .addEventListener('click', () => this.copyOutputToClipBoard());
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
            .querySelector('#editor-state-name')
            .addEventListener('change', this.setEditorStateName.bind(this));
        document
            .querySelector('#select-editor-state')
            .addEventListener('change', this.loadEditorStateById.bind(this));
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
        document.getElementById('diff-editor').style.display = 'block';
        document.getElementById('editor-container').style.display = 'block';
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

    private async loadEditorStateById(event: Event) {
        const stateId: string = (event.target as HTMLSelectElement).value;
        const state = await TextWandler.stateManager.getEditorState(stateId);
        await this.loadEditorState(state);
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
        this.diffEditor.getOriginalModel().setValue(state.diffEditorContent);

        const stateName: HTMLInputElement = document.getElementById(
            'editor-state-name'
        ) as HTMLInputElement;
        stateName.value = this.state.name;
        await this.updateStateSelect();
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
                this.diffEditor.modifiedModel.getValue()
            );
        } catch (error) {
            console.error(error.message);
        }
    }

    // RESETTING

    public resetCodeEditor() {
        localStorage.removeItem('editor-last-state');
        this.codeEditor.setValue(INITIAL_EDITOR_CONTENT);
        this.diffEditor.originalModel.setValue(INITIAL_INPUT_CONTENT);
    }

    public resetTextEditor() {
        this.diffEditor.reset();
    }

    // EXECUTING USER INPUT

    private evalInScope(js: string, contextAsScope: unknown) {
        return new Function(
            `with (this) { return ((() => { ${js} \n })()); }`
        ).call(contextAsScope);
    }

    public async runFunction() {
        this.state.savedAt = new Date();
        this.state.codeEditorContent = this.codeEditor.getValue();
        this.state.diffEditorContent = this.diffEditor
            .getOriginalModel()
            .getValue();

        await TextWandler.stateManager.upsertEditorState(this.state);

        document.getElementById('editor-container').style.display = 'block';
        document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('error-output').style.display = 'none';
        document.getElementById('diff-editor').style.display = 'block';

        try {
            this.evalInScope(this.codeEditor.getValue(), {
                _,
                getValue: () => this.diffEditor.getOriginalModel().getValue(),
                getJSON: () =>
                    JSON.parse(this.diffEditor.getOriginalModel().getValue()),
                setValue: (text: string) => {
                    this.diffEditor
                        .getModifiedModel()
                        .setValue(text.toString());
                },
                setJSON: (text: JSON) => {
                    this.diffEditor
                        .getModifiedModel()
                        .setValue(JSON.stringify(text, null, 4));
                },
                getLine: (lineNumber: number) => {
                    return this.diffEditor.getLineContent(lineNumber);
                },
                filterLine: (
                    lineFilter: (line: string, lineNumber: number) => boolean
                ): void => {
                    const originalModel = this.diffEditor.getOriginalModel();
                    const modifiedModel = this.diffEditor.getModifiedModel();

                    modifiedModel.setValue(originalModel.getValue());

                    for (let i = 1; i <= originalModel.getLineCount(); i++) {
                        modifiedModel.applyEdits([
                            {
                                range: new monaco.Range(
                                    i,
                                    1,
                                    i,
                                    originalModel.getLineContent(i).length + 1
                                ),
                                text: lineFilter(
                                    originalModel.getLineContent(i),
                                    i
                                )
                                    ? originalModel.getLineContent(i)
                                    : null
                            }
                        ]);
                    }
                },
                transformLine: (
                    lineMapper: (line: string, lineNumber: number) => string
                ) => {
                    const originalModel = this.diffEditor.getOriginalModel();
                    const modifiedModel = this.diffEditor.getModifiedModel();

                    modifiedModel.setValue(originalModel.getValue());

                    const edits = [];

                    for (let i = 1; i <= originalModel.getLineCount(); i++) {
                        edits.push({
                            range: new monaco.Range(
                                i,
                                1,
                                i,
                                originalModel.getLineContent(i).length + 1
                            ),
                            text: lineMapper(originalModel.getLineContent(i), i)
                        });
                    }
                    modifiedModel.applyEdits(edits);
                }
            });

            document.getElementById('menu-bar-info').innerHTML =
                `Length: ${this.diffEditor.getOriginalModel().getLineCount()}/${this.diffEditor.getModifiedModel().getLineCount()}`;
        } catch (e) {
            document.getElementById('error-output-content').innerHTML =
                `Error: ${e}`;
            document.getElementById('error-output').style.display = 'block';
            document.getElementById('diff-editor').style.display = 'none';
        }
    }
}
