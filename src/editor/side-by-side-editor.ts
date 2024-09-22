import * as monaco from 'monaco-editor';
import { Editor } from './editor';
import { editor } from 'monaco-editor';
import ITextModel = editor.ITextModel;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export class SideBySideEditor extends Editor {
    originalModel: ITextModel;
    modifiedModel: ITextModel;
    leftSideEditor: IStandaloneCodeEditor;
    rightSideEditor: IStandaloneCodeEditor;

    constructor(
        initialText?: string,
        documentElementId?: string,
        initialModifiedText?: string
    ) {
        super();

        if (!initialText || !documentElementId) return;

        this.originalModel = monaco.editor.createModel(initialText);
        this.modifiedModel = monaco.editor.createModel(
            initialModifiedText ?? initialText
        );

        const editorParentDiv = document.getElementById(documentElementId);
        const leftEditorDiv = document.getElementById('left-editor');
        const rightEditorDiv = document.getElementById('right-editor');
        editorParentDiv.style.display = 'block';

        this.leftSideEditor = monaco.editor.create(leftEditorDiv, {
            model: this.originalModel,
            language: 'javascript',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            theme: 'vs-dark',
            minimap: {
                enabled: false
            }
        });

        this.rightSideEditor = monaco.editor.create(rightEditorDiv, {
            model: this.modifiedModel,
            language: 'javascript',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            theme: 'vs-dark',
            minimap: {
                enabled: false
            }
        });
    }

    getLineContent(lineNumber: number): string {
        return this.leftSideEditor.getModel().getLineContent(lineNumber);
    }

    getValue(): string {
        return this.rightSideEditor.getValue();
    }

    setValue(value: string): void {
        this.rightSideEditor.setValue(value);
    }

    reset() {
        this.rightSideEditor
            .getModel()
            .setValue(this.leftSideEditor.getModel().getValue());
    }

    dispose() {
        this.leftSideEditor.dispose();
        this.rightSideEditor.dispose();
        this.originalModel.dispose();
        this.modifiedModel.dispose();
    }
}
