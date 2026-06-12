import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CaseStudyShell,
  Section,
  Metric,
  MetricGrid,
  TechRow,
  StatusBadge,
  Figure,
  Artifact,
} from "../_components/case-study";

export const metadata: Metadata = {
  title: "NBA Shot Selection — Offline RL",
  description:
    "Dueling DQN with per-entity Deep Sets and PBRS reward shaping, trained on 116,928 real NBA possessions — outperforms NBA players' shot decisions ~6× on shot-quality EPSA (+0.273 vs +0.044).",
  openGraph: {
    title: "NBA Shot Selection — Offline RL",
    description:
      "Dueling DQN with per-entity Deep Sets and PBRS reward shaping, trained on 116,928 real NBA possessions — outperforms NBA players' shot decisions ~6× on shot-quality EPSA (+0.273 vs +0.044).",
    type: "article",
  },
};

export default function Page() {
  return (
    <CaseStudyShell
      eyebrow="Reinforcement Learning · PyTorch"
      title="NBA Shot Selection — Offline RL on Real Tracking Data"
      tagline="A Dueling Deep Q-Network with a per-entity Deep Sets architecture and Potential-Based Reward Shaping that learns shoot-or-pass policies from 116,928 real NBA possessions — and outperforms actual NBA player decisions by ~6× on Expected Points per Shot Attempt."
      meta="AISE 4030 Reinforcement Learning · Western Engineering · April 2026"
    >
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="neutral">Course project — completed April 2026</StatusBadge>
        <StatusBadge tone="accent">Live demo</StatusBadge>
      </div>

      <Section title="Headline">
        <MetricGrid>
          <Metric
            label="Dueling DQN EPSA"
            value="+0.273"
            hint="shot-quality EPSA, full held-out test split — vs +0.044 for NBA players' actual choices (~6.2×)"
          />
          <Metric
            label="Baseline DQN EPSA"
            value="+0.229"
            hint="standard DQN — Dueling adds +0.044 on top"
          />
          <Metric
            label="Agreement with NBA players"
            value="56.5%"
            hint="vs 20% chance — rediscovered most basketball wisdom"
          />
          <Metric
            label="Possessions trained on"
            value="116,928"
            hint="from 631 games · 2015-16 SportVU"
          />
          <Metric
            label="Decision points evaluated"
            value="127,353"
            hint="23,447 possessions across held-out test games"
          />
          <Metric
            label="Evaluation"
            value="Deterministic greedy"
            hint="game-level 80/20 split prevents within-game leakage"
          />
        </MetricGrid>
      </Section>

      <a
        href="https://nba-rl-sim.vercel.app"
        target="_blank"
        rel="noreferrer"
        className="glass rounded-xl p-5 group flex items-center gap-4 transition-colors hover:border-accent/40"
      >
        <span className="min-w-0 flex-1">
          <span className="eyebrow block text-accent">
            Live possession explorer · runs in your browser
          </span>
          <span className="mt-1.5 block font-display text-lg font-semibold tracking-tight sm:text-xl">
            Watch the agent call shoot-or-pass on real NBA possessions — then drag
            a defender and watch it change its mind
          </span>
          <span className="mt-1.5 block font-mono text-xs text-muted">
            40 held-out possessions · what-if mode · the trained network runs
            client-side
          </span>
        </span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-faint transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>

      <Artifact
        href="https://github.com/issaa71/nba-rl-sim"
        label="Explorer source code · GitHub"
        detail="TypeScript inference engine matching the Python pipeline to 1e-6 — 250-vector parity suite, MIT"
      />

      <Figure
        src="/projects/nba-shot-selection/decision-maps.png"
        alt="Heatmaps of learned shoot probability by court zone for the DQN and Dueling DQN agents — high near the basket, suppressed in mid-range"
        caption="Decision maps from held-out test data — both agents independently rediscover modern shot-selection analytics."
        width={4769}
        height={1850}
        priority
        plate
      />

      <Figure
        src="/projects/nba-shot-selection/final-performance.png"
        alt="Bar chart of mean shot-quality EPSA across policies: random and always-shoot near zero, NBA player behavior slightly positive, baseline DQN higher, Dueling DQN highest"
        caption="Earlier 500-episode seed-42 snapshot — the ranking is stable (random ≈ always-shoot < NBA players ≪ DQN < Dueling DQN), but the canonical deterministic full-test numbers below (Dueling +0.273, DQN +0.229) supersede this draw. Error bars are per-episode standard deviation."
        width={3000}
        height={1800}
        plate
      />

      <Section title="Problem">
        <p>
          Shot selection is one of the most consequential decisions in professional
          basketball — at each step of a possession the ball-handler must decide whether
          to attempt a shot or pass, conditioned on defender positioning, teammate
          availability, shot-clock pressure, and their own shooting ability. The
          question this project asks is whether a learned policy, trained on real NBA
          tracking data, can outperform the actual decisions NBA players made.
        </p>
        <p>
          This is an <strong>offline RL</strong> problem with three pathologies that
          break standard DQN: (1) the agent learns entirely from a fixed dataset and
          cannot explore, (2) the four pass actions are variable-identity — the same
          action index points to a different teammate at every timestep, depending on
          who is closest to the ball-handler — which corrupts standard Bellman backups,
          and (3) shoot is a terminal action that occurs once per episode while passes
          can occur 2–10 times, creating asymmetry that interacts destructively with
          conservative offline-RL penalties like CQL.
        </p>
      </Section>

      <Section title="My role">
        <p>
          Solo course project — I owned the full implementation: data pipeline (parsing
          raw SportVU tracking JSON + play-by-play, possession segmentation, 78-dim
          state vector construction), custom Gymnasium environment, both the baseline
          DQN and the Dueling DQN, the per-entity Deep Sets architecture, the PBRS
          reward function, the training loop, and an interactive possession explorer
          that replays held-out possessions with the agent&apos;s live recommendation
          overlaid — rebuilt as a fully client-side app where the trained network runs
          in your browser.
        </p>
      </Section>

      <Section title="Approach — Per-Entity Deep Sets architecture">
        <p>
          The variable-identity action problem is solved by scoring each teammate
          individually through a shared encoder rather than mapping Q-values to fixed
          action slots. Two shared encoders (<code>phi_defender</code> and{" "}
          <code>phi_teammate</code>) embed each of the 5 defenders and 4 teammates
          independently. Defender representations are mean-pooled into a defender-context
          vector; teammate representations are kept per-entity. The shoot head takes the
          ball-handler context + pooled defender context and outputs Q(shoot). The pass
          head is shared across teammates and outputs Q(pass_i) per teammate, ensuring
          permutation equivariance and consistent Bellman targets regardless of which
          physical player occupies slot <em>i</em>.
        </p>
      </Section>

      <Section title="Approach — Dueling decomposition with type-aware normalization">
        <p>
          The Dueling architecture decomposes Q(s,a) = V(s) + A(s,a) − mean(A). The
          standard mean-subtraction biases the network <em>against</em> shooting when
          there are four pass actions and one shoot action — the mean is dominated by
          the pass group. The fix is type-aware advantage normalization: pass advantages
          are mean-centered within the pass group only, while the shoot advantage is
          left unnormalized.
        </p>
      </Section>

      <Section title="Approach — PBRS reward shaping with EPV potential">
        <p>
          Sparse terminal rewards (made shot / miss / turnover) don&apos;t propagate
          enough signal for short possessions. The solution is Potential-Based Reward
          Shaping (Ng et al. 1999) with a potential function defined as the maximum
          contest-adjusted Expected Points Value any teammate has at the current state.
          PBRS&apos;s theoretical property preserves the optimal policy while injecting
          dense per-step signal: a pass is rewarded only when it improves the court
          configuration, and a shoot is rewarded only when the ball-handler has a
          better look than any teammate. An additional shot-clock urgency penalty kicks
          in below 7 seconds.
        </p>
      </Section>

      <Section title="Approach — training details">
        <p>
          Double DQN target computation to mitigate overestimation bias. Hard target-net
          sync every 100 episodes (~570 gradient steps) rather than soft Polyak updates,
          chosen because soft updates destabilized the 450-player ID embeddings — most
          players appear rarely, so continuous small weight changes prevented the
          embedding table from converging. 100K-transition replay buffer with 3×
          terminal oversampling to compensate for shoot-action rarity. Adam at 1e-4,
          Huber loss with gradient clipping at 1.0. Linear epsilon decay from 1.0 → 0.01
          over the first 40K episodes.
        </p>
      </Section>

      <Section title="Results">
        <p>
          Both trained agents achieve positive shot-quality EPSA (Expected Points per
          Shot Attempt above league average). The Dueling DQN reaches{" "}
          <strong>+0.273</strong>, the baseline DQN reaches +0.229, and the behaviour
          policy (actual NBA player decisions) reaches +0.044 — meaning the trained
          agent selects shots whose expected value is roughly{" "}
          <strong>6× higher above league average</strong> than the choices real NBA
          players made on the same possession states. The mean expected value of the
          agent&apos;s chosen shots is 0.648 versus players&apos; 0.419. The gap between
          trained agents and the player baseline dwarfs the DQN-vs-Dueling gap (+0.044),
          confirming the headline finding: reward design and per-entity architecture
          matter far more than value decomposition.
        </p>
        <p>
          The agent and NBA players agree on shoot-vs-pass 56.5% of the time overall —
          well above the chance level and indicating the agent rediscovered substantial
          basketball wisdom. But the agent is far more willing to pull the trigger when
          the look is good: it shoots on 43.6% of decision points versus players&apos;
          15.7%. The agreement splits 50.2% on the decision points where the player
          actually shot and 57.6% where the player passed — the agent most often diverges
          by recommending a shot on looks the player declined, which is exactly where the
          shot-quality EPSA edge comes from.
        </p>
        <p>
          Decision-map heatmaps confirm the agent independently rediscovered modern NBA
          analytics: high shoot probability near the basket, sharply suppressed shooting
          from mid-range zones (15–30 — the worst EPV proposition in modern basketball),
          and selective three-point shooting based on zone FG% and defender proximity.
        </p>
        <p className="font-mono text-xs text-faint">
          Numbers: deterministic greedy evaluation over all 127,353 decision points in
          the held-out test games — same protocol the live explorer&apos;s footer reports.
        </p>
      </Section>

      <Section title="Tech stack">
        <TechRow
          items={[
            "Python",
            "PyTorch",
            "NumPy",
            "Gymnasium",
            "SportVU 2015-16",
            "pandas",
            "Matplotlib",
          ]}
        />
      </Section>

      <Section title="Reflection">
        <p>
          The two non-obvious wins were the per-entity architecture and the type-aware
          advantage normalization — both were corrections to subtle failure modes that
          standard implementations would silently learn around. The harder-won lesson
          was discipline around evaluation: the temptation to report a single headline
          number (like the 90.1% accuracy I&apos;d see clinical ML papers cite — see the{" "}
          <Link
            href="/projects/tha-pain-prediction"
            className="text-accent underline-offset-4 hover:underline"
          >
            <em>THA Pain Prediction</em>
          </Link>{" "}
          case study for that one) is high, but in offline
          RL with imbalanced data the right framing is multiple metrics interpreted
          together. Shot-quality EPSA, agreement rate, the shoot-rate gap, and the
          decision-map heatmaps each tell part of the story; any one alone would mislead.
        </p>
      </Section>
    </CaseStudyShell>
  );
}
