import {remember} from "@/lib/server-memory/serverMemory";
import {milliseconds, seconds} from "@/lib/server-memory/utils";
import CodeSnippet from "@/components/CodeSnippet";
import Link from "next/link"

const getLatestDate = async () => {
    return new Promise<Date>((resolve, reject) => {
        resolve(new Date())
    });
}

export default async function ServerMemoryPage() {
    // remember() gets an async parameterless function as incoming param
    const latestDate: Date = await remember(getLatestDate)

        // here you specify the hash name you can use later to invalidate it
        .as("LATEST_DATE")

        // for(...) gets an instance of MemoryDuration. There are helpers for most common time periods (e.g. minutes(), hours(), days())
        // and you can stack them as you need (e.g. days(5).and(hours(4)).and(minutes(5)))
        .for(seconds(5).and(milliseconds(50)))

    return <div className="flex flex-col gap-4">
        <h1><Link href="/">Home</Link> -&gt; Server Memory (<a target="_blank" href="https://github.com/gpaslari/nextjs-utils/tree/main/src/lib/server-memory">code on git</a>)</h1>
        <div>
            <div className="mb-2">This value is cached: <span
                className="p-2 bg-amber-400 rounded">{latestDate.toLocaleString()}</span></div>
            <div className="text-xs grey">Each new value will expire in 5 seconds and 50 milliseconds</div>
        </div>

        <div className="flex flex-col gap-y-4">
            <h2>How to use</h2>
            <div>
                <p>You can use Server Memory on the page or in SSR components</p>
                <CodeSnippet>
                    {
                        `const latestDate: Date = await remember(getLatestDate)
    .as("LATEST_DATE")
    .for(seconds(5).and(milliseconds(50)))`
                    }
                </CodeSnippet>
            </div>
            <div>
                <p>The simplest version would require <code>remember(...)</code> and <code>for(...)</code> only. In this
                    case default in memory map will be used as MemoryProvider and hash name will be randomly generated
                </p>
                <CodeSnippet>
                    {`const latestDate: Date = await remember(getLatestDate).for(minutes(5))`}
                </CodeSnippet>
            </div>
            <div>
                <p>Extended version would look like this</p>
                <CodeSnippet>
                    {
                        `// remember() gets an async parameterless function as incoming param
const latestDate: Date = await remember(getLatestDate)
        
    // here you specify the hash name you can use later to invalidate it
    .as("LATEST_DATE")
    
    // memory provider has to implement MemoryProvider
    .withMemoryProvider(yourMemoryProviderThatImplements_MemoryProvider)
    
    // for(...) gets an instance of MemoryDuration.
    // There are helpers for most common time periods (e.g. minutes(), hours(), days())
    // and you can stack them as you need (e.g. days(5).and(hours(4)).and(minutes(5)))
    .for(seconds(5).and(milliseconds(50)))`
                    }
                </CodeSnippet>
            </div>
        </div>
        <div className="flex flex-col gap-y-4">
            <h2>Creating custom <code>MemoryProvider</code></h2>
            <div>
                <p>By default RAM is used as a memory provider and all the data is kept in the application memory. In case you want the data to be persisted between application deploys or if you have huge amount of data - you need something else</p>
                <CodeSnippet>
                    {
`export interface MemoryProvider<T> {
    forget: (key: string) => void
    remember: (key: string) => VagueMemoryItem<T>
    memorise: (key: string, memory: MemoryItem<T>) => void
}`
                    }
                </CodeSnippet>
            </div>
            <div>
                <p>Following the example with RAM, create your own implementation, initialize your provider in a server functions file and use whenever you need</p>
                <CodeSnippet>
                    {
`export class RAM implements MemoryProvider<any> {
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
}`
                    }
                </CodeSnippet>
            </div>
        </div>
    </div>
}