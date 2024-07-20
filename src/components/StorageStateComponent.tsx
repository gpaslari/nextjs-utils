"use client"

import useStorageState from "@/lib/storage-state/useStorageState";
import {Identifiable} from "@/lib/storage-state/types";

interface Record extends Identifiable{
    name: string,
    creationDate: Date
}

export default function StorageStateComponent() {
    const {items, addItem, removeItem} = useStorageState<Record>("RECORDS")

    const addNewItem = () => {
        const name: string | null = prompt("Enter record name")
        if (name) {
            const creationDate: Date = new Date();
            addItem({
                id: creationDate.getTime().toString(),
                name,
                creationDate
            })
        }
    }

    const deleteItem = (record: Record) => () => {
        const confirmed = confirm(`Are you sure you want to delete record: "${record.name}"?`)
        if (confirmed) {
            removeItem(record.id)
        }
    }

    return <div className="flex flex-col gap-2 border-solid border-black border-2 w-full p-4 rounded">
        {items.length === 0 ? <div className="flex flex-row justify-center">No items yet. Use button below to add</div> : null}
        {items.map((record) => <div key={record.id} className="flex flex-row justify-between">
            <div className="text-gray-400">{record.creationDate.toLocaleString()}</div>
            <div>{record.name}</div>
            <div onClick={deleteItem(record)} className="text-xl bg-amber-500 hover:bg-amber-400 rounded-[15px] w-[30px] h-[30px] cursor-pointer text-center">-</div>
        </div>)}
        <div onClick={addNewItem} className="mt-4 text-[40px] bg-amber-500 rounded text-center cursor-pointer hover:bg-amber-400">+</div>
    </div>
}