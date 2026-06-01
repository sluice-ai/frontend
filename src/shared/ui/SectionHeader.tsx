type SectionHeaderProps = {
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  align = "left",
  copy,
  title,
}: SectionHeaderProps) {
  return (
    <header
      className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}
    >
      <h2 className="font-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-sluice-navy md:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {copy ? (
        <p className="mt-7 max-w-none font-sans text-base leading-7 tracking-normal text-sluice-ink md:text-lg">
          {copy}
        </p>
      ) : null}
    </header>
  );
}
