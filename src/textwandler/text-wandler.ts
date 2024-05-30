import { Editor } from '../editor/editor';
import {INITIAL_EDITOR_CONTENT, INITIAL_INPUT_CONTENT} from '../editor/initial-editor-content';
import { DiffEditor } from '../editor/diff-editor';
import { setupResizeHandler } from '../helper/resize-handler';
import * as _ from 'lodash';
import * as monaco from 'monaco-editor';
import {
    ClipboardCopy,
    createElement,
    Play,
    RotateCcw,
    Settings
} from 'lucide';

enum OUTPUT_EDITOR_MODE {
    EDITOR,
    DIFF_EDITOR
}

export class TextWandler {
    outputEditorMode = OUTPUT_EDITOR_MODE.DIFF_EDITOR;

    private codeEditor: Editor;
    private diffEditor: Editor | DiffEditor;

    constructor() {
        this.setupUI();

        this.codeEditor = new Editor(INITIAL_EDITOR_CONTENT, 'code-editor');
        this.diffEditor = new DiffEditor(INITIAL_INPUT_CONTENT, 'diff-editor');

        const lastState = localStorage.getItem('editor-last-state');
        if (!lastState) {
            // this.showWelcomeScreen();
            return;
        }
        const lastStateJson = JSON.parse(
            localStorage.getItem('editor-last-state')
        );
        this.codeEditor.setValue(lastStateJson.codeEditorContent);
        this.diffEditor
            .getOriginalModel()
            .setValue(lastStateJson.diffEditorContent);
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

    public runFunction() {
        localStorage.setItem(
            'editor-last-state',
            JSON.stringify({
                savedAt: new Date(),
                codeEditorContent: this.codeEditor.getValue(),
                diffEditorContent: this.diffEditor.getOriginalModel().getValue()
            })
        );

        document.getElementById('editor-container').style.display = 'block';
        document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('error-output').style.display = 'none';
        document.getElementById('diff-editor').style.display = 'block';

        try {
            this.evalInScope(this.codeEditor.getValue(), {
                _,
                getValue: () => this.diffEditor.getOriginalModel().getValue(),
                getJSON: () => JSON.parse(this.diffEditor.getOriginalModel().getValue()),
                setValue: (text: string) => {
                    this.diffEditor.getModifiedModel().setValue(text.toString());
                },
                setJSON: (text: JSON) => {
                    this.diffEditor.getModifiedModel().setValue(JSON.stringify(text, null , 4));
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
