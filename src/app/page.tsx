import Image from "next/image";
import ItemDetailsBlock from "@/components/ItemDetailsBlock";

export default function Home() {
  return (
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
        <ItemDetailsBlock
            link="/server-memory"
            title="Server Memory"
            subTitle="Server-side hashing library with developer-friendly interface, expiration and built-in extensibility"
            benefits={[
              "Easy to use",
              "Data cashed on the server",
              "Invalidates when time is up",
              "Shared among all requests",
              "Can be extended to use file system or DB of your choise"
            ]}
        />
          <ItemDetailsBlock
              link="/storage-state"
              title="Storage State"
              subTitle="A simple global state management library"
              benefits={[
                  "Easy to use - it's a simple hook",
                  "Shares global state components and pages",
                  "Persists data between sessions - local storage is your provider",
                  "Can be extended to use other storage providers"
              ]}
          />
      </div>
  );
}
