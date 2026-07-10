import type { Metadata } from "next";
import { TopBar, SiteFooter } from "../_components/drafting";
import { ProjectSheetList, PendingStrip } from "../_components/project-cards";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Six projects, five I designed and built, one I fought for: two autonomous robots, an offline-RL agent, two clinical ML tools, and a federal advocacy campaign.",
};

export default function ProjectsPage() {
  return (
    <>
      <TopBar variant="case" />
      <main className="mx-auto w-full max-w-[72rem] flex-1 px-6 lg:px-10">
        <section className="pt-14 pb-16">
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <span className="font-anno text-[10.5px] uppercase tracking-[0.16em] text-red">
              Project index
            </span>
            <span className="font-anno text-[10.5px] uppercase tracking-[0.16em] text-graphite">
              SHT 01–06
            </span>
          </div>

          <h1
            className="mt-6 font-struct text-[clamp(2rem,5.5vw,3.3rem)] leading-[1.02] tracking-tight text-ink"
            style={{ fontWeight: 750 }}
          >
            Projects
          </h1>
          <p className="mt-5 max-w-2xl font-prose text-[18px] leading-[1.65] text-ink">
            Six projects, five I designed and built, one I fought for: two
            autonomous robots, an offline-RL agent, two clinical ML tools, and a
            federal advocacy campaign.
          </p>

          <ProjectSheetList />
          <PendingStrip />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
