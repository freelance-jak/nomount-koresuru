import Link from "next/link";

const items = [
  { href: "/", label: "コレスル" },
  { href: "/about", label: "利用説明" },
];

export const Header = () => {
  return (
    <header className="bg-gray-200">
      {/* <h1>Title</h1> */}
      <nav className="w-80 m-auto">
        {items.map(({ href, label }) => {
          return (
            <Link key={href} href={href}>
              <a style={{ display: "inline-block", padding: 12 }}>{label}</a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
