import Image from "next/image";
import ItemDetailsBlock from "@/ui/ItemDetailsBlock";

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
      </div>
  );
}
