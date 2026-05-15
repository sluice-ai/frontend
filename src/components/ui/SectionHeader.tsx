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
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="body-copy mt-7 max-w-none">{copy}</p> : null}
    </header>
  );
}
