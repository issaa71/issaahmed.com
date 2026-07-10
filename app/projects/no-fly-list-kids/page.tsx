import type { Metadata } from "next";
import Image from "next/image";
import {
  SheetShell,
  Section,
  CalloutStrip,
  Callout,
  Timeline,
  RefRow,
  Ref,} from "../_components/sheet";

export const metadata: Metadata = {
  title: "No Fly List Kids · Federal Advocacy",
  description:
    "Federal advocacy with the No Fly List Kids coalition: Toronto Star op-ed, national media, PMO engagement: contributed to Bill C-59 and the $81M redress system.",
  openGraph: {
    title: "No Fly List Kids · Federal Advocacy",
    description:
      "Federal advocacy with the No Fly List Kids coalition: Toronto Star op-ed, national media, PMO engagement: contributed to Bill C-59 and the $81M redress system.",
    type: "article",
  },
};

export default function Page() {
  return (
    <SheetShell
      sheetNo="06"
      sheetCount="06"
      eyebrow="Policy · Communication · Coalition advocacy"
      title="No Fly List Kids · Federal Advocacy"
      tagline="A long-running federal advocacy campaign for Canadians wrongly flagged on the no-fly list, including me, since I was about five years old. The coalition I joined in 2017 contributed to the passage of Bill C-59 and an $81M federal budget allocation to build a redress system."
      meta="No Fly List Kids coalition · 2017 – present"
      status={[{ label: "Bill C-59 · passed 2019", tone: "red" }]}
    >
      {/*
        ASSET SWAP: when a broadcast still of Issa (a CTV / HuffPost interview
        frame from the Bill C-59 coverage) is supplied, slot a <FigurePlate>
        here, just below this press strip, in place of the placeholder video.
      */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-line py-4">
        <span className="anno mr-1">As featured in</span>
        <span className="inline-flex items-center border border-line px-3 py-2">
          <Image
            src="/press/toronto-star.svg"
            alt="Toronto Star"
            width={955}
            height={110}
            unoptimized
            className="h-4 w-auto opacity-90"
          />
        </span>
        <span className="inline-flex items-center border border-line px-3 py-2">
          <Image
            src="/press/huffpost.svg"
            alt="HuffPost"
            width={720}
            height={84}
            unoptimized
            className="h-4 w-auto opacity-90"
          />
        </span>
        <span className="border border-line px-3 py-2 font-struct text-[14px] font-medium leading-none text-ink-soft">
          CTV News
        </span>
        <span className="border border-line px-3 py-2 font-struct text-[14px] font-medium leading-none text-ink-soft">
          Middle East Eye
        </span>
      </div>

      <CalloutStrip className="[&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1">
        <Callout
          label="Legislation"
          value="Bill C-59"
          hint="National Security Act, 2017; passed 2019"
        />
        <Callout
          label="Federal funding"
          value="$81M"
          hint="2018 budget: redress system build"
        />
        <Callout
          label="Years of advocacy"
          value="8+"
          hint="member of the coalition since 2017"
        />
      </CalloutStrip>

      <Section title="How it unfolded">
        <Timeline
          label="Advocacy timeline"
          items={[
            {
              year: "2016",
              title: "No Fly List Kids coalition founded",
              detail:
                "Sulemaan Ahmed and Khadija Cajee, after their son Adam was flagged: collective work that carried the campaign for years.",
            },
            {
              year: "2017",
              title: "I joined the coalition",
              detail:
                "Flagged on the list myself since around age five, along with my two brothers.",
            },
            {
              year: "Age 16",
              title: "Toronto Star op-ed: “Grounded”",
              detail:
                "Sole author, on what it’s like to be a No Fly List kid. Broadcast and print interviews on CTV, HuffPost, and Middle East Eye followed.",
            },
            {
              year: "2018",
              title: "$81.4M federal redress budget",
              detail:
                "Allocated over five years to build a redress system ($8M in the first year).",
              accent: true,
            },
            {
              year: "2019",
              title: "Bill C-59 passes",
              detail:
                "National Security Act, 2017, with explicit provisions to support the redress system. Coalition photographed at the Library of Parliament.",
              accent: true,
            },
          ]}
          caption="Collective work: my contribution was alongside many families and members, not in place of them."
        />
      </Section>

      <Section title="Reference documents" prose={false}>
        <RefRow heading="">
          <Ref
            href="https://www.thestar.com/opinion/contributors/grounded-what-it-s-like-to-be-a-no-fly-list-kid/article_2a8a4669-d074-5f05-908a-edaae0f6ffe6.html"
            logo={{
              src: "/press/toronto-star.svg",
              alt: "Toronto Star",
              width: 955,
              height: 110,
            }}
            label="Toronto Star op-ed, written by me, age 16"
            detail="“Grounded: What it’s like to be a No Fly List kid” · sole author"
          />
          <Ref
            href="https://www.huffpost.com/archive/ca/entry/no-fly-list-kids-bill-c59_ca_5d0b7fd8e4b06ad4d25c1077"
            logo={{
              src: "/press/huffpost.svg",
              alt: "HuffPost",
              width: 720,
              height: 84,
            }}
            label="HuffPost Canada, Bill C-59 passage"
            detail="Quoted + photographed at the Library of Parliament · June 2019"
          />
        </RefRow>
        <p className="font-prose text-[14px] leading-relaxed text-ink-soft">
          The campaign (including my family) has also been covered by CTV News and
          Middle East Eye.
        </p>
      </Section>

      <Section title="Context">
        <p>
          Canada operates a &ldquo;Passenger Protect&rdquo; list, sometimes called the
          no-fly list, which flags travellers as security risks. The underlying matching
          system has historically used name-only comparisons, which produces high
          rates of false positives, including children. I was flagged on this list
          starting at around age five. My two brothers were also flagged. Hundreds of
          other Canadian children (most with common names like Adam Ahmed, Yusuf
          Ahmed, Sebastian Khan) have had similar experiences, often without their
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
          a redress system</strong>{" "}that lets affected travellers obtain a unique
          identifier to bypass the false match, and <strong>(2) sufficient funding
          and legislative authority</strong>{" "}to build it. Existing US redress systems
          (DHS TRIP) were the reference point; Canada needed an equivalent that
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
        <ul className="space-y-2 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:bg-red [&>li]:before:content-['']">
          <li>
            <strong>Op-ed in the Toronto Star</strong>, &ldquo;Grounded: What it&apos;s
            like to be a No Fly List kid,&rdquo; written at 16. (Artifact link below.)
          </li>
          <li>
            <strong>Broadcast and print interviews</strong>{" "}on CTV News, HuffPost Canada,
            Middle East Eye, and other outlets, sharing what it is like to be flagged
            as a security risk at a young age and how the false-positive system shapes
            Canadians&apos; everyday travel.
          </li>
          <li>
            <strong>Parliament Hill testimony and advocacy.</strong>{" "}Coalition members
            engaged directly with the Prime Minister&apos;s Office, Public Safety
            Minister Bill Blair, Cabinet Ministers, and cross-party MPs across multiple
            Parliament Hill days.
          </li>
        </ul>
      </Section>

      <Section title="Outcomes">
        <p>
          <strong>Bill C-59 (National Security Act, 2017)</strong>{" "}passed in 2019 with
          explicit provisions to support a redress system. The 2018 federal budget
          allocated <strong>$81.4 million</strong>{" "}over five years for redress
          implementation, with $8 million in the first year. The coalition continues to
          monitor implementation and advocate for individuals still affected.
        </p>
        <p>
          To be clear about credit: the coalition is collective work. Sulemaan Ahmed,
          Khadija Cajee, and many other families and members carried the campaign for
          years. My contribution was alongside theirs, not in place of them.
        </p>
      </Section>
    </SheetShell>
  );
}
