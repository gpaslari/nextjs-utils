interface Props {
    link: string,
    title: string,
    subTitle: string,
    benefits: string[]
}
export default function ItemDetailsBlock({link, title, subTitle, benefits}: Props) {
    return <div className="flex flex-col gap-y-3 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2 className="text-2xl font-semibold">
                {title}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
            </h2>
        </a>
        <h3>
            {subTitle}
        </h3>
        <ul className="ml-6 text-sm opacity-50" style={{listStyleType: "circle"}}>
            {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
        </ul>
    </div>
}