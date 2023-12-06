import Link, { LinkProps } from "../Link/Link";

interface SectionProps {
  title: string;
  links: LinkProps[];
}

export default function Section(props: SectionProps) {
  return (
    <section className="flex flex-col mb-20">
      <h1 className="uppercase font-bold text-slate-400 mb-2">{props.title}</h1>

      {props.links.map((link) => (
        <Link
          key={link.name}
          name={link.name}
          icon={link.icon}
          route={link.route}
        />
      ))}
    </section>
  );
}
