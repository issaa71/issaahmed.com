import type { Metadata } from "next";
import {
  CaseStudyShell,
  Section,
  Metric,
  MetricGrid,
  TechRow,
  Figure,
} from "../_components/case-study";

export const metadata: Metadata = {
  title: "NBA Shot Selection — Offline RL",
  description:
    "Dueling DQN with per-entity Deep Sets and PBRS reward shaping, trained on 116,928 real NBA possessions — outperforms NBA player shot decisions ~6× on EPSA.",
  openGraph: {
    title: "NBA Shot Selection — Offline RL",
    description:
      "Dueling DQN with per-entity Deep Sets and PBRS reward shaping, trained on 116,928 real NBA possessions — outperforms NBA player shot decisions ~6× on EPSA.",
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
      <Figure
        src="/projects/nba-shot-selection/decision-maps.png"
        alt="Heatmaps of learned shoot probability by court zone for the DQN and Dueling DQN agents — high near the basket, suppressed in mid-range"
        caption="Decision maps from held-out test data — both agents independently rediscover modern shot-selection analytics."
        width={4769}
        height={1850}
        priority
        plate
      />

      <Section title="Headline">
        <MetricGrid>
          <Metric
            label="Dueling DQN EPSA"
            value="+0.246"
            hint="vs +0.042 NBA player baseline — ~6× gain"
          />
          <Metric
            label="Baseline DQN EPSA"
            value="+0.208"
            hint="Dueling DQN gap of +0.039 on top"
          />
          <Metric
            label="Agreement with NBA players"
            value="55.4%"
            hint="vs 20% chance — rediscovered most basketball wisdom"
          />
          <Metric
            label="Possessions trained on"
            value="116,928"
            hint="from 631 games · 2015-16 SportVU"
          />
          <Metric
            label="Training episodes"
            value="100,000"
            hint="custom Gymnasium env"
          />
          <Metric
            label="Held-out test"
            value="500 episodes"
            hint="game-level 80/20 split prevents within-game leakage"
          />
        </MetricGrid>
      </Section>

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
          reward function, the training loop, and the FastAPI visualization app that
          replays real possessions with the agent&apos;s recommendation overlaid in
          real time.
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
          Both trained agents achieve positive EPSA (Expected Points per Shot Attempt
          above league average). The Dueling DQN reaches <strong>+0.246</strong>, the
          baseline DQN reaches +0.208, and the behaviour policy (actual NBA player
          decisions) reaches +0.042 — meaning the trained agent selects shots whose
          expected value is roughly <strong>6× higher above league average</strong>{" "}
          than the choices real NBA players made on the same possession states. The
          gap between trained agents and baselines (0.17–0.26) dwarfs the DQN-vs-Dueling
          gap (0.039), confirming the headline finding: reward design and per-entity
          architecture matter far more than value decomposition.
        </p>
        <Figure
          src="/projects/nba-shot-selection/final-performance.png"
          alt="Bar chart of mean EPSA across policies: Random −0.018, Always Shoot −0.034, NBA player behavior +0.042, DQN +0.208, Dueling DQN +0.246"
          caption="Final evaluation — 500 held-out episodes, seed 42. Error bars are per-episode standard deviation."
          width={3000}
          height={1800}
          plate
        />
        <p>
          A post-hoc analysis found 55.4% agreement between the agent&apos;s greedy
          policy and what NBA players actually did on the same possessions — above
          the 20% chance level and indicating the agent rediscovered substantial
          basketball wisdom. Analysis of the 44.6% disagreement is instructive: 811
          cases where players shot but the agent recommended passing had a mean
          ball-handler EPV of 0.154 (well below the 0.375 league average — these are
          contested shots the agent correctly declined), and 4,476 cases where players
          passed but the agent recommended shooting had a mean ball-handler EPV of 0.678
          (nearly double league average — missed-shot opportunities).
        </p>
        <p>
          Decision-map heatmaps confirm the agent independently rediscovered modern NBA
          analytics: high shoot probability near the basket, sharply suppressed shooting
          from mid-range zones (15–30 — the worst EPV proposition in modern basketball),
          and selective three-point shooting based on zone FG% and defender proximity.
        </p>
      </Section>

      <Section title="Tech stack">
        <TechRow
          items={[
            "Python",
            "PyTorch",
            "NumPy",
            "Gymnasium",
            "FastAPI",
            "SportVU 2015-16",
            "pandas",
            "Matplotlib",
            "Streamlit",
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
          <em>THA Pain Prediction</em> case study for that one) is high, but in offline
          RL with imbalanced data the right framing is multiple metrics interpreted
          together. EPSA, agreement rate, the disagreement-case breakdown, and the
          decision-map heatmaps each tell part of the story; any one alone would mislead.
        </p>
      </Section>
    </CaseStudyShell>
  );
}
