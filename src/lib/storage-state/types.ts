export interface Identifiable {
    id: string
}

export interface StorageState<T extends Identifiable> {
    items: T[],
    addItem: (item:T) => void,
    removeItem: (removeId: string) => void
}

export interface StorageProvider<T> {
    getItems: (key: string) => T[]
    saveItems: (key: string, items: T[]) => void
}

export class LocalStorageProvider<T> implements StorageProvider<T> {
    getItems(key: string): T[] {
        const initialJson = localStorage.getItem(key) || "[]"
        return JSON.parse(initialJson) as T[]
    }

    saveItems(key: string, items: T[]): void {
        localStorage.setItem(key, JSON.stringify(items))
    }

}