import Link from "next/link";

interface FooterLinksProps {
  items: {
    title: string;
    links: { label: string; href: string }[];
  };
}

export default function FooterLinks({ items }: FooterLinksProps) {
  return (
    <>
      <h2 className="text-h7-semibold text-white pb-2">
        {items.title}
      </h2>
      <div className="flex flex-col gap-1.5">
        {items.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-white text-h7-regular"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
