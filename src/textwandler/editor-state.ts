interface EditorState {
    id: string;
    name: string;
    savedAt: Date;
    codeEditorContent: string;
    diffEditorContent: string;
    unsaved?: boolean;
}
