import type { Metadata } from "next";
import {
  CaseStudyShell,
  Section,
  Metric,
  MetricGrid,
  Artifact,
  ArtifactRow,
  StatusBadge,
} from "../_components/case-study";

export const metadata: Metadata = {
  title: "No Fly List Kids — Federal Advocacy",
  description:
    "Federal advocacy with the No Fly List Kids coalition: Toronto Star op-ed, national media, PMO engagement — contributed to Bill C-59 and the $81M redress system.",
  openGraph: {
    title: "No Fly List Kids — Federal Advocacy",
    description:
      "Federal advocacy with the No Fly List Kids coalition: Toronto Star op-ed, national media, PMO engagement — contributed to Bill C-59 and the $81M redress system.",
    type: "article",
  },
};

export default function Page() {
  return (
    <CaseStudyShell
      eyebrow="Policy · Communication · Coalition advocacy"
      title="No Fly List Kids — Federal Advocacy"
      tagline="A long-running federal advocacy campaign for Canadians wrongly flagged on the no-fly list — including me, since I was about five years old. The coalition I joined in 2017 contributed to the passage of Bill C-59 and an $81M federal budget allocation to build a redress system."
      meta="No Fly List Kids coalition · 2017 – present"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-faint">
          Toronto Star · CTV News · HuffPost Canada · Middle East Eye
        </p>
        <StatusBadge tone="accent">Bill C-59 — passed 2019</StatusBadge>
      </div>

      <Section title="Headline">
        <MetricGrid>
          <Metric
            label="Legislation"
            value="Bill C-59"
            hint="Passed — National Security Act, 2017"
          />
          <Metric
            label="Federal funding"
            value="$81 million"
            hint="2018 budget — redress system build"
          />
          <Metric
            label="Years of advocacy"
            value="8+"
            hint="member of the coalition since 2017"
          />
          <Metric
            label="Original research"
            value="50-name audit"
            hint="cross-referenced known no-fly list names against the 411.ca public directory"
          />
        </MetricGrid>
      </Section>

      <Section title="Context">
        <p>
          Canada operates a &ldquo;Passenger Protect&rdquo; list, sometimes called the
          no-fly list, which flags travellers as security risks. The underlying matching
          system has historically used name-only comparisons, which produces high
          rates of false positives — including children. I was flagged on this list
          starting at around age five. My two brothers were also flagged. Hundreds of
          other Canadian children — most with common names like Adam Ahmed, Yusuf
          Ahmed, Sebastian Khan — have had similar experiences, often without their
          families understanding why.
        </p>
        <p>
          The No Fly List Kids coalition was founded by Sulemaan Ahmed and Khadija
          Cajee in 2016 after their son Adam was flagged. I joined in 2017 as a teenager
          and have been an active member of the campaign since.
        </p>
      </Section>

      <Section title="What we asked for">
        <p>
          The campaign had two concrete asks of the federal government: <strong>(1)
          a redress system</strong> that lets affected travellers obtain a unique
          identifier to bypass the false match, and <strong>(2) sufficient funding
          and legislative authority</strong> to build it. Existing US redress systems
          (DHS TRIP) were the reference point — Canada needed an equivalent that
          worked at the airline check-in level rather than requiring travellers to
          re-prove their identity at every flight.
        </p>
      </Section>

      <Section title="My contribution">
        <p>
          As one of the coalition&apos;s younger and more publicly visible members, my
          role was personal storytelling, media work, and direct engagement with
          decision-makers.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Op-ed in the Toronto Star</strong> — &ldquo;Grounded: What it&apos;s
            like to be a No Fly List kid,&rdquo; written at 16. (Artifact link below.)
          </li>
          <li>
            <strong>Broadcast and print interviews</strong> on CTV News, HuffPost Canada,
            Middle East Eye, and other outlets, sharing what it is like to be flagged
            as a security risk at a young age and how the false-positive system shapes
            Canadians&apos; everyday travel.
          </li>
          <li>
            <strong>Parliament Hill testimony and advocacy.</strong> Coalition members
            engaged directly with the Prime Minister&apos;s Office, Public Safety
            Minister Bill Blair, Cabinet Ministers, and cross-party MPs across multiple
            Parliament Hill days.
          </li>
          <li>
            <strong>Original investigative work.</strong> Working with another coalition
            member, Rayaan Kamal, I took 50 names known to be on the no-fly list (drawn
            from public-domain articles) and cross-referenced them against the free{" "}
            <code>411.ca</code> public directory to estimate how many ordinary
            Canadians share names with flagged individuals. The exercise made the
            scale of the false-positive problem concrete in a way that anecdotes
            alone couldn&apos;t.
          </li>
        </ul>
      </Section>

      <Section title="Outcomes">
        <p>
          <strong>Bill C-59 (National Security Act, 2017)</strong> passed in 2019 with
          explicit provisions to support a redress system. The 2018 federal budget
          allocated <strong>$81.4 million</strong> over five years for redress
          implementation, with $8 million in the first year. The coalition continues to
          monitor implementation and advocate for individuals still affected.
        </p>
        <p>
          To be clear about credit: the coalition is collective work. Sulemaan Ahmed,
          Khadija Cajee, and many other families and members carried the campaign for
          years. My contribution was alongside theirs, not in place of them.
        </p>
      </Section>

      <Section title="Artifacts">
        <ArtifactRow>
          <Artifact
            href="https://www.thestar.com/opinion/contributors/grounded-what-it-s-like-to-be-a-no-fly-list-kid/article_2a8a4669-d074-5f05-908a-edaae0f6ffe6.html"
            label="Toronto Star op-ed"
            detail="“Grounded: What it’s like to be a No Fly List kid”"
          />
          <Artifact
            href="https://www.huffpost.com/archive/ca/entry/no-fly-list-kids-bill-c59_ca_5d0b7fd8e4b06ad4d25c1077"
            label="HuffPost Canada — Bill C-59 passage"
            detail="Quoted + photographed at the Library of Parliament · June 2019"
          />
        </ArtifactRow>
        <p className="text-sm text-muted">
          The campaign — including my family — has also been covered by CTV News and
          Middle East Eye.
        </p>
      </Section>

      <Section title="Why this is on an engineering portfolio">
        <p>
          For technical roles the question this answers is: <em>does this person
          communicate well and operate under high stakes?</em> Op-eds, broadcast
          interviews, and direct engagement with the PMO are real-world tests of being
          able to explain a complicated system clearly under pressure. The
          investigative work alongside Rayaan is also an honest exercise in data
          analysis on a publicly relevant problem — a complement to the more
          technically-heavy ML and robotics work elsewhere on this site.
        </p>
      </Section>
    </CaseStudyShell>
  );
}
