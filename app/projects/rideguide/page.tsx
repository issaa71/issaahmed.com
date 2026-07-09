import type { Metadata } from "next";
import {
  CaseStudyShell,
  Section,
  Metric,
  MetricGrid,
  TechRow,
  StatusBadge,
  Callout,
} from "../_components/case-study";
import { FlowDiagram } from "../../_components/visuals";

export const metadata: Metadata = {
  title: "RideGuide — AI Transit Assistant",
  description:
    "A natural-language transit assistant for the Greater Toronto & Hamilton Area — live GTFS-RT arrivals, delays, and trip planning across 10 agencies, powered by real-time protobuf feeds and an LLM tool-calling agent.",
  openGraph: {
    title: "RideGuide — AI Transit Assistant",
    description:
      "A natural-language transit assistant for the GTHA — live GTFS-RT arrivals and trip planning across 10 agencies, powered by an LLM query pipeline.",
    type: "article",
  },
};

export default function Page() {
  return (
    <CaseStudyShell
      eyebrow="Applied AI · Full-stack"
      title="RideGuide — AI Transit Assistant for the GTHA"
      tagline="A natural-language transit assistant for the Greater Toronto & Hamilton Area — ask “Is the 504 on time?” in plain English and get a live, stop- and direction-aware answer, drawn from real-time GTFS feeds across ten agencies."
      meta="Proof-of-concept · FastAPI + Next.js · GPT-4o-mini + Claude agent · GTFS-RT · 10 GTHA agencies"
    >
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="accent">Working proof-of-concept</StatusBadge>
        <StatusBadge>Private repo — architecture shown, code not linked</StatusBadge>
      </div>

      {/* CONFIRM before publishing: solo vs. collaborator. Research flagged a
          collaborator ("Ahmed Naeem") + a separate reliability-ML repo, so the
          "My role" section and any solo framing must be verified with Issa. */}

      <Section title="Headline">
        <MetricGrid>
          <Metric
            label="Transit agencies"
            value="10"
            hint="TTC, GO Transit, MiWay, HSR, UP Express, Brampton, YRT/Viva, Burlington, Oakville, Durham"
            accent
          />
          <Metric
            label="LLM query pipelines"
            value="2"
            hint="a deterministic GPT-4o-mini path + a feature-flagged Claude tool-calling agent"
          />
          <Metric
            label="Agent tools"
            value="16"
            hint="read tools (arrivals, delays, alerts, fares, trip planning) + write tools (save trip, preferences)"
          />
          <Metric
            label="Live data"
            value="GTFS-RT"
            hint="real-time protobuf feeds, 15-second cache, joined back to each agency's static GTFS"
          />
        </MetricGrid>
      </Section>

      <Section title="Problem">
        <p>
          Getting a straight answer about transit in the Greater Toronto &amp; Hamilton
          Area means juggling a dozen disconnected apps and agency sites: is my bus on
          time, when&apos;s the next one at <em>my</em> stop, is there a delay, how do I
          get from A to B, and what will it cost. The real-time answers exist — every
          agency publishes a GTFS-RT feed — but they&apos;re locked inside binary
          protobuf streams and fragmented across ten operators, from the TTC and GO
          Transit down to Burlington and Durham.
        </p>
        <p>
          RideGuide is a proof-of-concept that puts a single natural-language assistant
          in front of all of them. You ask a question the way you&apos;d ask a person —
          &quot;Is the 504 on time?&quot;, &quot;How do I get from King Station to
          Union?&quot; — and it resolves the agency, the stop, and the direction, pulls
          live predictions, and answers in plain language.
        </p>
      </Section>

      <Section title="My role">
        <p>
          I built RideGuide as a proof-of-concept: the transit-data layer (real-time
          GTFS-RT ingestion and the joins back to each agency&apos;s static schedule),
          the two LLM query pipelines, and the FastAPI backend, with a Next.js / React
          front-end on top. The most involved engineering was not the model prompting —
          it was making messy, real-world transit data trustworthy enough for an LLM to
          speak from.
        </p>
      </Section>

      <Section title="Approach">
        <FlowDiagram
          label="Query pipeline (deterministic path)"
          steps={[
            { label: "Question", sub: "natural language" },
            { label: "Parse intent", sub: "GPT-4o-mini" },
            { label: "Resolve stop", sub: "geo · GTFS match" },
            { label: "Fetch live data", sub: "GTFS-RT protobuf", accent: true },
            { label: "Answer", sub: "GPT-4o-mini" },
          ]}
          caption="The stable path is a deterministic five-step pipeline. A newer, feature-flagged Claude agent runs the same tools as a tool-calling loop — a migration strategy that keeps a reliable product live while the richer agent is proven out."
        />
        <p>
          The system deliberately runs <strong>two LLM pipelines side by side</strong>.
          The stable path is a deterministic five-step flow: an intent parser
          (GPT-4o-mini) pulls the route, stop, and intent; the app resolves the agency
          and stop (haversine for &quot;near me&quot;, geocoding for landmarks, fuzzy
          matching against GTFS stop names); a GTFS-RT client fetches live predictions;
          and a response generator writes the reply. The newer path is a Claude
          tool-calling agent (default off, behind a flag) that runs up to five tool
          iterations per turn over a suite of read and write tools.
        </p>
        <p>
          <strong>Real-time data, not mocked.</strong> A transit client fetches each
          agency&apos;s GTFS-RT protobuf feeds and parses them with the
          <code> gtfs-realtime-bindings</code> library — trip updates, vehicle positions
          (including crowding), and service alerts — behind a 15-second cache so the
          agency servers aren&apos;t hammered. Live data is joined back to the static
          GTFS feed by <code>trip_id</code> / <code>stop_id</code> to recover
          human-readable route and direction context.
        </p>
        <p>
          <strong>The unglamorous fix that makes it trustworthy.</strong> The TTC&apos;s
          real-time feed reports a broken <code>direction_id</code>, so RideGuide reads
          direction from the static feed via the <code>trip_id</code> join instead — and
          pins the specific static feed whose ID namespace matches the real-time one
          (roughly 96% trip / 99.9% stop match). Small joins like this are the difference
          between an assistant that sounds confident and one that&apos;s actually right.
        </p>
      </Section>

      <Section title="What's built — and what isn't">
        <p>
          RideGuide reads as a working application rather than a demo skeleton: real
          GTFS-RT ingestion and static-feed joins, the full GPT-4o-mini pipeline, the
          feature-flagged Claude agent loop, a live Mapbox vehicle map, WebSocket and
          Server-Sent-Events streaming, fare calculation with One Fare transfer logic,
          trip planning, and a Postgres persistence layer for profiles and push
          subscriptions.
        </p>
        <Callout title="Honest status">
          It&apos;s a proof-of-concept, not a shipped product. The Claude agent path
          defaults off and coexists with the deterministic pipeline pending a planned
          cutover; recurring-trip scheduling is spec-only (it stores the spec but no
          scheduler fires it yet); a few agencies&apos; alert scrapers are still on the
          backlog; and Oakville is schedule-only, with no real-time feed. I&apos;d rather
          state that plainly than imply a finished system.
        </Callout>
      </Section>

      <Section title="Tech stack">
        <TechRow
          items={[
            "Python",
            "FastAPI",
            "GPT-4o-mini",
            "Claude (agent)",
            "GTFS-RT / protobuf",
            "httpx",
            "Next.js",
            "React",
            "TypeScript",
            "Postgres · SQLAlchemy",
            "WebSockets · SSE",
            "Mapbox",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The interesting lesson in RideGuide is that most of the value in an
          &quot;AI&quot; product like this lives below the model. Real transit feeds are
          messy — a major agency ships a <code>direction_id</code> that&apos;s wrong on
          every real-time trip, and static and live feeds arrive in incompatible ID
          namespaces. The reliability comes from the verified joins and fallbacks that
          make the model&apos;s answer defensible, not from the prompt. The
          dual-pipeline design — a cheap deterministic path plus a feature-flagged agent
          — is the same instinct: keep a stable thing working while you prove out the
          fancier one.
        </p>
      </Section>
    </CaseStudyShell>
  );
}
