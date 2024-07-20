import { useState, useEffect, useMemo } from "react";
import {LocalStorageProvider, StorageProvider, StorageState, Identifiable} from "@/lib/storage-state/types";

const localStorageProvider = new LocalStorageProvider<any>();

export default function useStorageState<T extends Identifiable>(storageName: string, storageProvider: StorageProvider<T> = localStorageProvider): StorageState<T> {
    const [data, setData] = useState<T[]>([]);

    const eventName = useMemo<string>(() => {
        return `${storageName}_Change`
    }, [storageName]);

    useEffect(() => {
        const readItemsFromStorage = () => {
            setData(storageProvider.getItems(storageName))
        }
        readItemsFromStorage()

        const eventHandler = (e: Event) => {
            readItemsFromStorage()
        }

        window.addEventListener(eventName, eventHandler)

        return () => {window.removeEventListener(storageName, eventHandler)}
    }, [eventName, storageName, storageProvider]);

    const addItem = (item: T) => {
        const otherItems = data.filter(existingItem => existingItem.id !== item.id)
        const items = [...otherItems, item]
        storageProvider.saveItems(storageName, items)
        setData(items)
        window.dispatchEvent(new CustomEvent(eventName))
    }

    const removeItem = (removeId: string) => {
        const items = data.filter(item => item.id !== removeId)
        storageProvider.saveItems(storageName, items)
        setData(items)
        window.dispatchEvent(new CustomEvent(eventName))
    }

    return {items: data, addItem, removeItem}
}