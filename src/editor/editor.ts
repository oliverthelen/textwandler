import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import ITextModel = editor.ITextModel;
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

export class Editor {
    originalModel: ITextModel;
    modifiedModel: ITextModel;
    standAloneEditor: IStandaloneCodeEditor;

    constructor(initialText?: string, documentElementId?: string) {
        if (!initialText || !documentElementId) return;

        this.originalModel = monaco.editor.createModel(
            initialText,
            'javascript'
        );
        this.modifiedModel = monaco.editor.createModel(
            initialText,
            'javascript'
        );
        this.standAloneEditor = monaco.editor.create(
            document.getElementById(documentElementId),
            {
                model: this.modifiedModel,
                language: 'javascript',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                theme: 'vs-dark',
                minimap: {
                    enabled: false
                }
            }
        );

        this.standAloneEditor.onDidChangeModelContent(() => {
            // if (runFunctionUsed) return;
            this.originalModel.setValue(this.modifiedModel.getValue());
        });

        this.standAloneEditor.updateOptions({ readOnly: false });
    }

    getOriginalModel(): ITextModel {
        return this.originalModel;
    }

    getModifiedModel(): ITextModel {
        return this.modifiedModel;
    }

    getLineContent(lineNumber: number): string {
        return this.standAloneEditor.getModel().getLineContent(lineNumber);
    }

    getValue(): string {
        return this.standAloneEditor.getValue();
    }

    setValue(value: string): void {
        this.standAloneEditor.setValue(value);
    }

    reset(): void {
        // runFunctionUsed = false;
        this.standAloneEditor.setValue(this.originalModel.getValue());
    }
}
