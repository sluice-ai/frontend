import { Container } from "./ui/Container";

const links = [
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/sluice-ai" },
];

export function Footer() {
  return (
    <footer className="border-t border-sluice-navy/10 py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="caption">Copyright 2026 Sluice. Built on Bittensor.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-sans text-sm font-medium tracking-normal text-sluice-muted transition-colors hover:text-sluice-navy"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
