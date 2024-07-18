import {
    MemoryDuration,
    MemoryItem,
    MemoryProvider,
    RAM,
    RetrieveMemory,
    VagueMemoryItem
} from "@/lib/server-memory/types";
import uuid from "react-uuid";

const defaultMemoryProvider = new RAM();

export const remember = (retrieve: RetrieveMemory) => {
    const memoryKey: string = uuid();
    return {as: recall(retrieve), for: forDuration(memoryKey, retrieve, defaultMemoryProvider), withMemoryProvider: withMemoryProvider(memoryKey, retrieve)}
}

const recall = (retrieve: RetrieveMemory) => (memoryKey: string) => {
    return {for: forDuration(memoryKey, retrieve, defaultMemoryProvider), withMemoryProvider: withMemoryProvider(memoryKey, retrieve)}
}

const withMemoryProvider = (memoryKey: string, retrieve: RetrieveMemory) => <T>(memoryProvider: MemoryProvider<T>) => {
    return {for: forDuration(memoryKey, retrieve, memoryProvider)}
}

const forDuration = <T> (memoryKey: string, retrieve: RetrieveMemory, memoryProvider: MemoryProvider<T>) => (rememberFor: MemoryDuration): Promise<any> => {
    return memorise(memoryKey, retrieve, rememberFor, memoryProvider)
}

const memorise = async <T>(memoryKey: string, retrieve: RetrieveMemory, rememberFor: MemoryDuration, memoryProvider: MemoryProvider<T>): Promise<T> => {
    const memory: VagueMemoryItem<T> = memoryProvider.remember(memoryKey)
    if (memory && memory.isValid()) {
        return memory.value
    }

    const res:any = await retrieve()

    memoryProvider.memorise(memoryKey, new MemoryItem(res, rememberFor));

    return res;
}