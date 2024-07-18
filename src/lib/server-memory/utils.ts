import { MemoryDuration, TimeUnit} from "@/lib/server-memory/types";

export const milliseconds = (amount: number): MemoryDuration => new MemoryDuration(amount, TimeUnit.MILLISECOND)
export const seconds = (amount: number): MemoryDuration => new MemoryDuration(amount, TimeUnit.SECOND)
export const minutes = (amount: number): MemoryDuration => new MemoryDuration(amount, TimeUnit.MINUTE)
export const hours = (amount: number): MemoryDuration => new MemoryDuration(amount, TimeUnit.HOUR)
export const days = (amount: number): MemoryDuration => new MemoryDuration(amount, TimeUnit.DAY)