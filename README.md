This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It contains different useful utilities I developed for myself while working on different NextJS projects:

## Utilities

### Server Memory
**Problem:** I need an application level cache with auto refresh. Built-in NextJS caching is request or page level.

**Existing solutions:** In 15 min didn't find anything nice and simple.

**My Solution:** "Server Memory" with expiry and auto-refresh. Does it in app RAM by default, can easily be extended to use file system, NoSQL DB or anything else you like as a memory provider ;)

#### Example
```typescript
// remember() gets an async parameterless function as incoming param
const latestDate: Date = await remember(getLatestDate)

    // here you specify the hash name you can use later to invalidate it
    .as("LATEST_DATE")

    // for(...) gets an instance of MemoryDuration. There are helpers for most common time periods (e.g. minutes(), hours(), days())
    // and you can stack them as you need (e.g. days(5).and(hours(4)).and(minutes(5)))
    .for(seconds(5).and(milliseconds(50)))
```
#### Links
- [Usage example](https://github.com/gpaslari/nextjs-utils/blob/main/src/app/server-memory/page.tsx)
- [Code itself](https://github.com/gpaslari/nextjs-utils/tree/main/src/lib/server-memory)

### Storage State
**Problem:** I need a simple global and persisted state management functionality and don't want to go through complex redux configuration.

**Existing solutions:** Redux is too complicated, others... I don't know any other options TBH...

**My Solution:** "Storage State" - as simple as React useState hook. Gracefully shares the provided state among all components. Uses LocalStorage by default, can easily be extended to use other memory provider ;)

#### Example
```typescript
// you don't even need this comment to understand how to use it, do you?
const {items, addItem, removeItem} = useStorageState<Record>("RECORDS")
```
#### Links
- [Usage example](https://github.com/gpaslari/nextjs-utils/blob/main/src/components/StorageStateComponent.tsx)
- [Code itself](https://github.com/gpaslari/nextjs-utils/tree/main/src/lib/storage-state)


## Running the app

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
