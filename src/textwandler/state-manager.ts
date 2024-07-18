export class StateManager {
    private db: IDBDatabase;
    private initialized: boolean = false;
    private static instance = new StateManager();

    private constructor() {}

    public initializeDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('text-wandler', 1);

            request.onupgradeneeded = (event) => {
                this.db = request.result;
                const store = this.db.createObjectStore('editor-states', {
                    keyPath: 'id'
                });
                store.createIndex('by_saved_at', 'savedAt');
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.initialized = true;
                return resolve();
            };

            request.onerror = () => {
                return reject();
            };
        });
    }

    public static async getInstance(): Promise<StateManager> {
        if (!this.instance.initialized) {
            await this.instance.initializeDatabase();
        }
        return this.instance;
    }

    public getLatestEditorState(): Promise<EditorState> {
        return new Promise((resolve, reject) => {
            const editorStateStore = this.db
                .transaction('editor-states', 'readwrite')
                .objectStore('editor-states');

            const index = editorStateStore.index('by_saved_at');
            const request = index.openCursor(null, 'prev');

            request.onsuccess = () => {
                return resolve(request.result?.value);
            };
            request.onerror = () => {
                return reject();
            };
        });
    }

    public getEditorState(stateId: string): Promise<EditorState> {
        return new Promise((resolve, reject) => {
            const editorStateStore = this.db
                .transaction('editor-states', 'readwrite')
                .objectStore('editor-states');
            const request = editorStateStore.get(stateId);

            request.onsuccess = () => {
                return resolve(request.result);
            };
            request.onerror = () => {
                return reject();
            };
        });
    }

    public getEditorStates(): Promise<EditorState[]> {
        return new Promise((resolve, reject) => {
            const editorStateStore = this.db
                .transaction('editor-states', 'readwrite')
                .objectStore('editor-states');
            const request = editorStateStore.getAll();

            request.onsuccess = () => {
                return resolve(request.result);
            };
            request.onerror = () => {
                return reject();
            };
        });
    }

    public upsertEditorState(state: EditorState): Promise<void> {
        return new Promise((resolve, reject) => {
            const editorStateStore = this.db
                .transaction('editor-states', 'readwrite')
                .objectStore('editor-states');
            const request = editorStateStore.put(state);

            request.onsuccess = () => {
                return resolve();
            };
            request.onerror = () => {
                return reject();
            };
        });
    }

    public deleteEditorState(stateId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const editorStateStore = this.db
                .transaction('editor-states', 'readwrite')
                .objectStore('editor-states');
            const request = editorStateStore.delete(stateId);

            request.onsuccess = () => {
                return resolve();
            };
            request.onerror = () => {
                return reject();
            };
        });
    }
}
