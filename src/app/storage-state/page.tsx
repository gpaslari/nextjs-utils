import Link from "next/link";
import CodeSnippet from "@/components/CodeSnippet";
import StorageStateComponent from "@/components/StorageStateComponent";

export default function StorageStatePage() {
    return <div className="flex flex-col gap-4">
        <h1><Link href="/">Home</Link> -&gt; Storage State (<a target="_blank"
                                                               href="https://github.com/gpaslari/nextjs-utils/tree/main/src/lib/server-memory">code
            on git</a>)</h1>
        <div>
            <div className="mb-4">Components below share their state through the Storage State</div>
            <div className="flex flex-col md:flex-row gap-4">
                <StorageStateComponent/>
                <StorageStateComponent/>
            </div>
        </div>

        <div className="flex flex-col gap-y-4">
            <h2>How to use</h2>
            <div>
                <p>It is as simple as using any other react hook</p>
                <CodeSnippet>
                    {
                        `const {items, addItem, removeItem} = useStorageState<Record>("RECORDS")`
                    }
                </CodeSnippet>
            </div>
            <div>
                <p>Storage can store any types which implement <code>Identifiable</code>, where id is unique.
                </p>
                <CodeSnippet>
                    {
`export interface Identifiable {
    id: string
}`}
                </CodeSnippet>
            </div>
        </div>
        <div className="flex flex-col gap-y-4">
            <h2>Creating custom <code>StorageProvider</code></h2>
            <div>
                <p>By default LocalStorageProvider is used as provider and all the data is kept in the browser local
                    strage. In
                    case you want the data to be shared across multiple devices and browsers or you don&apos;t even need
                    it to be persisted - you can easily define your own Storage by
                    implementing <code>StorageProvider</code></p>
                <CodeSnippet>
                    {
`export interface StorageProvider<T> {
    getItems: (key: string) => T[]
    saveItems: (key: string, items: T[]) => void
}`
                    }
                </CodeSnippet>
            </div>
            <div>
                <p>Following the example with LocalStorageProvider, create your own implementation, initialize your provider and use whenever you need</p>
                <CodeSnippet>
                    {
`export class LocalStorageProvider<T> implements StorageProvider<T> {
    getItems(key: string): T[] {
        const initialJson = localStorage.getItem(key)
        return JSON.parse(initialJson) as T[]
    }

    saveItems(key: string, items: T[]): void {
        localStorage.setItem(key, JSON.stringify(items));
    }
}`
                    }
                </CodeSnippet>
            </div>
        </div>
    </div>
}