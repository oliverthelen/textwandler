import * as monaco from 'monaco-editor';
import { Editor } from './editor';
import { editor } from 'monaco-editor';
import ITextModel = editor.ITextModel;
import IDiffEditor = editor.IDiffEditor;

export class DiffEditor extends Editor {
    originalModel: ITextModel;
    modifiedModel: ITextModel;
    diffEditor: IDiffEditor;

    constructor(initialText?: string, documentElementId?: string) {
        super();

        if (!initialText || !documentElementId) return;

        this.originalModel = monaco.editor.createModel(initialText);
        this.modifiedModel = monaco.editor.createModel(initialText);
        this.diffEditor = monaco.editor.createDiffEditor(
            document.getElementById(documentElementId),
            {
                automaticLayout: true,
                scrollBeyondLastLine: false,
                originalEditable: true
            }
        );

        this.diffEditor.setModel({
            original: this.originalModel,
            modified: this.modifiedModel
        });
    }

    getLineContent(lineNumber: number): string {
        return this.diffEditor
            .getOriginalEditor()
            .getModel()
            .getLineContent(lineNumber);
    }

    getValue(): string {
        return this.diffEditor.getModifiedEditor().getValue();
    }

    setValue(value: string): void {
        this.diffEditor.getModifiedEditor().setValue(value);
    }

    reset() {
        this.diffEditor
            .getModifiedEditor()
            .getModel()
            .setValue(
                this.diffEditor.getOriginalEditor().getModel().getValue()
            );
    }
}
