import { layers } from "../data/siteContent";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Solution() {
  return (
    <section id="solution" className="section-shell bg-sluice-paperWarm/80">
      <Container>
        <div className="rounded-[24px] bg-sluice-paper/80 p-6 md:rounded-frame md:p-12 lg:p-[72px]">
          <SectionHeader
            title="Routing is infrastructure."
            copy="Sluice turns provider fragmentation into a decision layer that selects the best path for each request."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {layers.map((layer) => (
              <Card key={layer.name} isActive={layer.isSluice}>
                <div className="section-label text-sluice-routeBlue">
                  {layer.name}
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold leading-none tracking-normal text-sluice-navy">
                  {layer.title}
                </h3>
                <p className="caption mt-5">{layer.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-card border border-sluice-navy/20">
            <table className="w-full border-collapse bg-sluice-paper/70 font-sans">
              <thead>
                <tr className="border-b border-sluice-navy/25 text-left text-sm uppercase tracking-normal text-sluice-navy">
                  <th className="px-5 py-4 font-medium">Layer</th>
                  <th className="px-5 py-4 font-medium">Role</th>
                  <th className="hidden px-5 py-4 font-medium md:table-cell">
                    Decision surface
                  </th>
                </tr>
              </thead>
              <tbody>
                {layers.map((layer) => (
                  <tr
                    key={layer.name}
                    className="border-b border-sluice-navy/10 last:border-0"
                  >
                    <td className="px-5 py-4 font-semibold text-sluice-navy">
                      {layer.name}
                    </td>
                    <td className="px-5 py-4 text-sluice-ink">
                      {layer.title}
                    </td>
                    <td className="hidden px-5 py-4 text-sluice-muted md:table-cell">
                      {layer.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
