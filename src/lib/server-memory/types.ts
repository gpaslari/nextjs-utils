export enum TimeUnit {
    MILLISECOND = 1,
    SECOND = 1000,
    MINUTE = 60000,
    HOUR = 3600000,
    DAY = 86400000,
}
export class MemoryDuration {
    milliseconds: number;

    constructor(amount: number, unit: TimeUnit) {
        this.milliseconds = amount * unit.valueOf();
    }

    and(otherDuration: MemoryDuration): MemoryDuration {
        this.milliseconds += otherDuration.milliseconds;
        return this;
    }
}

export class MemoryItem<T> {
    value: T;
    duration: MemoryDuration;
    creationDate: Date;

    constructor(value: any, duration: MemoryDuration) {
        this.value = value;
        this.duration = duration;
        this.creationDate = new Date();
    }

    isValid(): boolean {
        return this.creationDate.getTime() + this.duration.milliseconds > new Date().getTime()
    }
}

export type VagueMemoryItem<T> = MemoryItem<T> | undefined;

interface Memory<T> {
    [key: string]: MemoryItem<T>
}

export type RetrieveMemory = () => any;

export interface MemoryProvider<T> {
    forget: (key: string) => void
    remember: (key: string) => VagueMemoryItem<T>
    memorise: (key: string, memory: MemoryItem<T>) => void
}

export class RAM implements MemoryProvider<any> {
    private memory: Memory<any> = {}

    forget(key: string): void {
        if (this.memory[key]) {
            delete this.memory[key]
        }
    }

    remember(key: string): VagueMemoryItem<any> {
        return this.memory[key];
    }

    memorise(key: string, memory: MemoryItem<any>): void {
        this.memory[key] = memory
    }
}